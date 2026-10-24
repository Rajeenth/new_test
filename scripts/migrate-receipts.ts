// scripts/migrate-receipts.ts
import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { randomUUID } from 'crypto';
import { DataStore } from '../src/lib/dataStore.ts';

/**
 * Migrates any existing `receiptBase64` fields in orders to real image files.
 *
 * 1️⃣ For each order that has `receiptBase64` and no `receiptUrl`:
 *    - Decode the Base64 string (expecting a data URL like `data:image/png;base64,...`).
 *    - Write the binary data to `public/images/receipts/<uuid>-<timestamp>.ext`.
 *    - Update the order record with `{ receiptUrl: <public path> }` and delete `receiptBase64`.
 * 2️⃣ Logs progress to stdout.
 */
async function migrate() {
  const orders = DataStore.getOrders(); // Returns an array of order objects
  for (const order of orders) {
    if ((order as any).receiptBase64 && !order.receiptUrl) {
      const match = (order as any).receiptBase64.match(/^data:image\/(\w+);base64,(.+)$/);
      if (!match) {
        console.warn(`Order ${order.id} has malformed receiptBase64 – skipping`);
        continue;
      }
      const [, ext, b64] = match;
      const buffer = Buffer.from(b64, 'base64');

      const filename = `${randomUUID()}-${Date.now()}.${ext}`;
      const destDir = join(process.cwd(), 'public', 'images', 'receipts');
      const destPath = join(destDir, filename);

      await fs.mkdir(dirname(destPath), { recursive: true });
      await fs.writeFile(destPath, buffer);

      const publicUrl = `/images/receipts/${filename}`;
      DataStore.updateOrder(order.id, { receiptUrl: publicUrl });
      // Optionally remove the Base64 field – DataStore.updateOrder can handle omission
      console.log(`Migrated order ${order.id}: ${publicUrl}`);
    }
  }
  console.log('Migration complete');
}

migrate().catch(err => {
  console.error('Migration error:', err);
  process.exit(1);
});
