using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Dal.Migrations
{
    public partial class _7Subscriptionupdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IntentId",
                table: "Subscription",
                newName: "SubscriptionId");

            migrationBuilder.AlterColumn<DateTime>(
                name: "StartDate",
                table: "Subscription",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<DateTime>(
                name: "EndDate",
                table: "Subscription",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AddColumn<DateTime>(
                name: "TrialEnd",
                table: "Subscription",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "TrialStart",
                table: "Subscription",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateAdded",
                table: "PlayListSongs",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2022, 4, 8, 8, 32, 11, 653, DateTimeKind.Utc).AddTicks(9867),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2022, 4, 7, 19, 14, 35, 121, DateTimeKind.Utc).AddTicks(9750));

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateAdded",
                table: "PlayLists",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2022, 4, 8, 8, 32, 11, 652, DateTimeKind.Utc).AddTicks(1498),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2022, 4, 7, 19, 14, 35, 120, DateTimeKind.Utc).AddTicks(1485));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TrialEnd",
                table: "Subscription");

            migrationBuilder.DropColumn(
                name: "TrialStart",
                table: "Subscription");

            migrationBuilder.RenameColumn(
                name: "SubscriptionId",
                table: "Subscription",
                newName: "IntentId");

            migrationBuilder.AlterColumn<DateTime>(
                name: "StartDate",
                table: "Subscription",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "EndDate",
                table: "Subscription",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateAdded",
                table: "PlayListSongs",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2022, 4, 7, 19, 14, 35, 121, DateTimeKind.Utc).AddTicks(9750),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2022, 4, 8, 8, 32, 11, 653, DateTimeKind.Utc).AddTicks(9867));

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateAdded",
                table: "PlayLists",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2022, 4, 7, 19, 14, 35, 120, DateTimeKind.Utc).AddTicks(1485),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2022, 4, 8, 8, 32, 11, 652, DateTimeKind.Utc).AddTicks(1498));
        }
    }
}
