#!/bin/bash

# Image Compression Script for Personal Site
# Compresses images to web-optimized sizes following the project standards:
# - JPEGs: Quality 50, max 1000px width
# - PNGs: Quality 40-60, max 1000px width
# - Target: <100KB final WebP size after Astro optimization

# set -e  # Removed to handle errors more gracefully

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counters
PROCESSED=0
SKIPPED=0
ERRORS=0

# Check if required tools are available
check_dependencies() {
    local missing_tools=()

    for tool in magick pngquant jpegoptim identify; do
        if ! command -v "$tool" &> /dev/null; then
            missing_tools+=("$tool")
        fi
    done

    if [ ${#missing_tools[@]} -ne 0 ]; then
        echo -e "${RED}Error: Missing required tools: ${missing_tools[*]}${NC}"
        echo "Install with: sudo dnf install ImageMagick pngquant jpegoptim"
        exit 1
    fi
}

# Function to compress JPEG files
compress_jpeg() {
    local file="$1"
    local original_size=$(du -h "$file" | cut -f1)

    echo -e "${BLUE}Compressing JPEG: $(basename "$file") (${original_size})${NC}"

    # Auto-orient (apply EXIF rotation), resize to max 1000px width and compress to quality 50
    if magick "$file" -auto-orient -resize "1000x>" -quality 50 -strip -interlace Plane -sampling-factor 4:2:0 "$file"; then
        local new_size=$(du -h "$file" | cut -f1)
        echo -e "${GREEN}✓ Compressed: ${original_size} → ${new_size}${NC}"
        ((PROCESSED++))
        git add "$file"
    else
        echo -e "${RED}✗ Failed to compress: $(basename "$file")${NC}"
        ((ERRORS++))
    fi
}

# Function to compress PNG files
compress_png() {
    local file="$1"
    local original_size=$(du -h "$file" | cut -f1)

    echo -e "${BLUE}Compressing PNG: $(basename "$file") (${original_size})${NC}"

    # Create temp file for ImageMagick processing
    local temp_file="${file}.tmp"

    # Resize to max 1000px width
    if magick "$file" -resize "1000x>" -strip "$temp_file"; then
        # Compress with pngquant
        if pngquant --quality=40-60 --strip --speed 1 --force --output "$file" "$temp_file"; then
            rm -f "$temp_file"
            local new_size=$(du -h "$file" | cut -f1)
            echo -e "${GREEN}✓ Compressed: ${original_size} → ${new_size}${NC}"
            ((PROCESSED++))
            git add "$file"
        else
            rm -f "$temp_file"
            echo -e "${RED}✗ Failed to compress with pngquant: $(basename "$file")${NC}"
            ((ERRORS++))
        fi
    else
        rm -f "$temp_file"
        echo -e "${RED}✗ Failed to resize: $(basename "$file")${NC}"
        ((ERRORS++))
    fi
}

# Function to check if file needs compression
needs_compression() {
    local file="$1"
    local size_kb=$(du -k "$file" | cut -f1)

    # Skip files under 100KB (already optimized)
    if [ "$size_kb" -lt 100 ]; then
        return 1
    fi

    return 0
}

# Function to process a single file
process_file() {
    local file="$1"

    # Check if file exists and is a regular file
    if [ ! -f "$file" ]; then
        return
    fi

    # Check if compression is needed
    if ! needs_compression "$file"; then
        echo -e "${YELLOW}Skipping $(basename "$file") (already under 100KB)${NC}"
        ((SKIPPED++))
        return
    fi

    # Determine file type and compress accordingly
    case "${file,,}" in
        *.jpg|*.jpeg)
            compress_jpeg "$file"
            ;;
        *.png)
            compress_png "$file"
            ;;
        *)
            echo -e "${YELLOW}Skipping unsupported file: $(basename "$file")${NC}"
            ((SKIPPED++))
            ;;
    esac
}

# Main function
main() {
    echo -e "${BLUE}🖼️  Personal Site Image Compression${NC}"
    echo -e "${BLUE}Target: <100KB final WebP size after Astro optimization${NC}"
    echo ""

    check_dependencies

    # If specific files are provided as arguments, process only those
    if [ $# -gt 0 ]; then
        echo "Processing specified files..."
        for file in "$@"; do
            process_file "$file"
        done
    else
        # Process all images in content directories
        echo "Processing all images in src/content/..."

        # Find all image files in content directories
        while IFS= read -r -d '' file; do
            process_file "$file"
        done < <(find src/content -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.JPG" \) -print0)
    fi

    echo ""
    echo -e "${BLUE}📊 Compression Summary:${NC}"
    echo -e "${GREEN}  Processed: $PROCESSED files${NC}"
    echo -e "${YELLOW}  Skipped: $SKIPPED files${NC}"
    if [ $ERRORS -gt 0 ]; then
        echo -e "${RED}  Errors: $ERRORS files${NC}"
    fi

    if [ $PROCESSED -gt 0 ]; then
        echo ""
        echo -e "${GREEN}✓ Image compression complete! Run 'npm run build' to see final optimized sizes.${NC}"
    fi

    # Exit with success
    exit 0
}

# Run main function with all arguments
main "$@"