import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { LISTING } from '../data/listingData.js';

describe('Airbnb Listing Integrity & FAANG Verification Suite', () => {
  it('should load listing with correct title and property type', () => {
    assert.equal(LISTING.title, 'Romantic Jacuzzi 1BHK Candolim | Mirashya UG10');
    assert.equal(LISTING.type, 'Entire serviced apartment in Candolim, India');
    assert.equal(LISTING.rating, 4.95);
    assert.equal(LISTING.reviewsCount, 19);
    assert.equal(LISTING.guestFavourite, true);
  });

  it('should have 5 valid hero photo indices matching reference screenshot', () => {
    assert.equal(LISTING.heroPhotoIndices.length, 5);
    // [6, 3, 4, 12, 28] matching reference hero grid
    assert.deepEqual(LISTING.heroPhotoIndices, [6, 3, 4, 12, 28]);
    
    // Check that each hero photo exists in the photos array
    for (const idx of LISTING.heroPhotoIndices) {
      assert.ok(LISTING.photos[idx], `Photo index ${idx} must exist`);
      assert.ok(LISTING.photos[idx].webp, `Photo ${idx} must have webp source`);
    }
  });

  it('should contain all 43 real property photos across 9 categories', () => {
    assert.equal(LISTING.photos.length, 43, 'Must have exactly 43 photos');
    assert.equal(LISTING.categories.length, 9, 'Must have exactly 9 room categories');

    // Verify all categories have at least 1 photo
    for (const cat of LISTING.categories) {
      const count = LISTING.photos.filter(p => p.cat === cat.key).length;
      assert.ok(count > 0, `Category ${cat.title} must have photos, found ${count}`);
    }
  });

  it('should verify all 43 WebP property photos exist on disk with valid file size', () => {
    for (const photo of LISTING.photos) {
      // Photo webp path starts with /assets/photos/...
      const relPath = photo.webp.replace(/^\//, 'public/');
      assert.ok(fs.existsSync(relPath), `File must exist on disk: ${relPath}`);
      const stats = fs.statSync(relPath);
      assert.ok(stats.size > 5000, `File ${relPath} should be at least 5KB, found ${stats.size}`);
    }
  });

  it('should verify all 8 nearby stay photos exist on disk with valid file size', () => {
    assert.equal(LISTING.nearby.length, 8, 'Must have 8 nearby stays');
    for (const stay of LISTING.nearby) {
      const relPath = stay.img.replace(/^\//, 'public/');
      assert.ok(fs.existsSync(relPath), `Nearby image must exist: ${relPath}`);
      const stats = fs.statSync(relPath);
      assert.ok(stats.size > 5000, `Nearby image ${relPath} size ${stats.size} must be > 5KB`);
    }
  });

  it('should verify pricing calculations for 5-night stay', () => {
    assert.equal(LISTING.price.nights, 5);
    assert.equal(LISTING.price.amount, '₹28,499');
    assert.equal(LISTING.price.totalNumber, 28499);
  });

  it('should verify 54 amenities across 13 categories in modal', () => {
    assert.equal(LISTING.amenityCategories.length, 13);
    let totalItems = 0;
    for (const cat of LISTING.amenityCategories) {
      totalItems += cat.items.length;
    }
    assert.equal(totalItems, 54, 'Should have exactly 54 amenities from real Airbnb data');
  });
});
