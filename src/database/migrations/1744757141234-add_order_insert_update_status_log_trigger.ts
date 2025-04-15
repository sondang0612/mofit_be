import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOrderInsertUpdateStatusLogTrigger1744757141234
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      -- Tạo function log status
      CREATE OR REPLACE FUNCTION public.fn_order_insert_update_status_log()
      RETURNS trigger
      LANGUAGE plpgsql
      AS $function$
      BEGIN
          INSERT INTO order_status_logs (
              "createdAt",
              "updatedAt",
              "isDeleted",
              "orderId",
              "previousStatus",
              "currentStatus",
              "time"
          ) VALUES (
              NOW(),
              NOW(),
              false,
              NEW.id,
              CASE WHEN TG_OP = 'INSERT' THEN NULL ELSE OLD.status END,
              NEW.status,
              NOW()
          );
          RETURN NEW;
      END;
      $function$;

      -- Tạo trigger gọi function sau mỗi INSERT hoặc UPDATE
      CREATE TRIGGER trg_order_insert_update_status_log
      AFTER INSERT OR UPDATE ON orders
      FOR EACH ROW
      EXECUTE FUNCTION fn_order_insert_update_status_log();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TRIGGER IF EXISTS trg_order_insert_update_status_log ON orders;
    `);

    await queryRunner.query(`
      DROP FUNCTION IF EXISTS public.fn_order_insert_update_status_log;
    `);
  }
}
