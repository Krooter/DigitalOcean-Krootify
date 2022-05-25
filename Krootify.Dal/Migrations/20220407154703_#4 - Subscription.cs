using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Dal.Migrations
{
    public partial class _4Subscription : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SubscriptionId",
                table: "Profile",
                type: "nvarchar(max)",
                nullable: true);

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
                oldDefaultValue: new DateTime(2021, 10, 2, 13, 54, 41, 389, DateTimeKind.Utc).AddTicks(1441));

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateAdded",
                table: "PlayLists",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2022, 4, 7, 15, 47, 3, 521, DateTimeKind.Utc).AddTicks(8473),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 10, 2, 13, 54, 41, 386, DateTimeKind.Utc).AddTicks(1838));

            migrationBuilder.CreateTable(
                name: "Subscription",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StartDate = table.Column<TimeSpan>(type: "time", nullable: false),
                    EndDate = table.Column<TimeSpan>(type: "time", nullable: false),
                    PlanId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IntentId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SubscriptionStatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subscription", x => x.Id);
                });

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Profile_Subscription_SubscriptionId1",
                table: "Profile");

            migrationBuilder.DropTable(
                name: "Subscription");

            migrationBuilder.DropIndex(
                name: "IX_Profile_SubscriptionId1",
                table: "Profile");

            migrationBuilder.DropColumn(
                name: "SubscriptionId",
                table: "Profile");

            migrationBuilder.DropColumn(
                name: "SubscriptionId1",
                table: "Profile");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateAdded",
                table: "PlayListSongs",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 10, 2, 13, 54, 41, 389, DateTimeKind.Utc).AddTicks(1441),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2022, 4, 7, 15, 47, 3, 523, DateTimeKind.Utc).AddTicks(6307));

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateAdded",
                table: "PlayLists",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 10, 2, 13, 54, 41, 386, DateTimeKind.Utc).AddTicks(1838),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2022, 4, 7, 15, 47, 3, 521, DateTimeKind.Utc).AddTicks(8473));
        }
    }
}
