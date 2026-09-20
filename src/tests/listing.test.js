import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

// Extract LISTING data from TypeScript source file
function loadListingData() {
  const filePath = path.resolve('src/data/listing.ts');
  const raw = fs.readFileSync(filePath, 'utf8');
  const jsCode = raw
    .replace(/import\s+[\s\S]*?;/, '')
    .replace('export const LISTING: Listing =', 'return');
  return new Function(jsCode)();
}

const LISTING = loadListingData();

describe('Airbnb Listing Data & Asset Integrity Test Suite', () => {
  it('should load listing with correct title, type, rating, and guest constraints', () => {
    assert.equal(LISTING.title, 'Romantic Jacuzzi 1BHK Candolim | Mirashya UG10');
    assert.equal(LISTING.type, 'Entire serviced apartment in Candolim, India');
    assert.equal(LISTING.rating, 4.95);
    assert.equal(LISTING.reviewsCount, 19);
    assert.equal(LISTING.guestFavourite, true);
    assert.equal(LISTING.guestsMax, 3);
  });

  it('should contain exactly 5 valid hero photo indices matching the reference layout', () => {
    assert.equal(LISTING.heroPhotoIndices.length, 5);
    assert.deepEqual(LISTING.heroPhotoIndices, [6, 3, 4, 12, 28]);

    for (const idx of LISTING.heroPhotoIndices) {
      assert.ok(LISTING.photos[idx], `Hero photo at index ${idx} must exist`);
      assert.ok(LISTING.photos[idx].webp, `Hero photo ${idx} must have webp path`);
    }
  });

  it('should contain all 43 property photos across 9 room categories', () => {
    assert.equal(LISTING.photos.length, 43, 'Must have exactly 43 photos');
    assert.equal(LISTING.categories.length, 9, 'Must have exactly 9 room categories');

    for (const cat of LISTING.categories) {
      const count = LISTING.photos.filter((p) => p.cat === cat.key).length;
      assert.ok(count > 0, `Category ${cat.title} must contain at least 1 photo, found ${count}`);
    }
  });

  it('should verify all 43 WebP property photos exist on disk with valid file size (>5KB)', () => {
    for (const photo of LISTING.photos) {
      const relPath = photo.webp.replace(/^\//, 'public/');
      const absPath = path.resolve(relPath);
      assert.ok(fs.existsSync(absPath), `Photo file must exist on disk: ${relPath}`);
      const stats = fs.statSync(absPath);
      assert.ok(stats.size > 5000, `Photo file ${relPath} should be > 5KB, found ${stats.size} bytes`);
    }
  });

  it('should verify all 8 nearby stay photos exist on disk with valid file size (>5KB)', () => {
    assert.equal(LISTING.nearby.length, 8, 'Must have 8 nearby stays');
    for (const stay of LISTING.nearby) {
      const relPath = stay.img.replace(/^\//, 'public/');
      const absPath = path.resolve(relPath);
      assert.ok(fs.existsSync(absPath), `Nearby stay image must exist on disk: ${relPath}`);
      const stats = fs.statSync(absPath);
      assert.ok(stats.size > 5000, `Nearby image ${relPath} should be > 5KB, found ${stats.size} bytes`);
    }
  });

  it('should verify pricing calculations for a 5-night stay', () => {
    assert.equal(LISTING.price.nights, 5);
    assert.equal(LISTING.price.amount, '₹28,499');
    assert.equal(LISTING.price.totalNumber, 28499);
    assert.equal(LISTING.price.perNight, '₹5,700');
  });

  it('should verify exactly 54 amenities categorized across 13 amenity groups', () => {
    assert.equal(LISTING.amenityCategories.length, 13, 'Must have 13 amenity categories');
    let totalAmenities = 0;
    for (const cat of LISTING.amenityCategories) {
      totalAmenities += cat.items.length;
    }
    assert.equal(totalAmenities, 54, 'Must have exactly 54 amenities');
  });
});
