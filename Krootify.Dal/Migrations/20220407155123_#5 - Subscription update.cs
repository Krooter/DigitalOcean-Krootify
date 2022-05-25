using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Dal.Migrations
{
    public partial class _5Subscriptionupdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Profile_Subscription_SubscriptionId1",
                table: "Profile");

            migrationBuilder.DropIndex(
                name: "IX_Profile_SubscriptionId1",
                table: "Profile");

            migrationBuilder.DropColumn(
                name: "SubscriptionId1",
                table: "Profile");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Subscription",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "SubscriptionId",
                table: "Profile",
                type: "int",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateAdded",
                table: "PlayListSongs",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2022, 4, 7, 15, 51, 22, 948, DateTimeKind.Utc).AddTicks(8565),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2022, 4, 7, 15, 47, 3, 523, DateTimeKind.Utc).AddTicks(6307));

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateAdded",
                table: "PlayLists",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2022, 4, 7, 15, 51, 22, 945, DateTimeKind.Utc).AddTicks(5914),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2022, 4, 7, 15, 47, 3, 521, DateTimeKind.Utc).AddTicks(8473));

            migrationBuilder.CreateIndex(
                name: "IX_Profile_SubscriptionId",
                table: "Profile",
                column: "SubscriptionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Profile_Subscription_SubscriptionId",
                table: "Profile",
                column: "SubscriptionId",
                principalTable: "Subscription",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Profile_Subscription_SubscriptionId",
                table: "Profile");

            migrationBuilder.DropIndex(
                name: "IX_Profile_SubscriptionId",
                table: "Profile");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Subscription");

            migrationBuilder.AlterColumn<string>(
                name: "SubscriptionId",
                table: "Profile",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SubscriptionId1",
                table: "Profile",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateAdded",
                table: "PlayListSongs",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2022, 4, 7, 15, 47, 3, 523, DateTimeKind.Utc).AddTicks(6307),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2022, 4, 7, 15, 51, 22, 948, DateTimeKind.Utc).AddTicks(8565));

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateAdded",
                table: "PlayLists",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2022, 4, 7, 15, 47, 3, 521, DateTimeKind.Utc).AddTicks(8473),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2022, 4, 7, 15, 51, 22, 945, DateTimeKind.Utc).AddTicks(5914));

            migrationBuilder.CreateIndex(
                name: "IX_Profile_SubscriptionId1",
                table: "Profile",
                column: "SubscriptionId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Profile_Subscription_SubscriptionId1",
                table: "Profile",
                column: "SubscriptionId1",
                principalTable: "Subscription",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
