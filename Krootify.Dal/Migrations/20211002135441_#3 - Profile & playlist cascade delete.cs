using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Dal.Migrations
{
    public partial class _3Profileplaylistcascadedelete : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlayLists_AspNetUsers_UserId",
                table: "PlayLists");

            migrationBuilder.DropForeignKey(
                name: "FK_Profile_AspNetUsers_UserId",
                table: "Profile");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateAdded",
                table: "PlayListSongs",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 10, 2, 13, 54, 41, 389, DateTimeKind.Utc).AddTicks(1441),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 9, 20, 8, 49, 3, 153, DateTimeKind.Utc).AddTicks(9839));

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateAdded",
                table: "PlayLists",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 10, 2, 13, 54, 41, 386, DateTimeKind.Utc).AddTicks(1838),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 9, 20, 8, 49, 3, 153, DateTimeKind.Utc).AddTicks(2474));

            migrationBuilder.AddColumn<string>(
                name: "UserId1",
                table: "PlayLists",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PlayLists_UserId1",
                table: "PlayLists",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_PlayLists_AspNetUsers_UserId",
                table: "PlayLists",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PlayLists_AspNetUsers_UserId1",
                table: "PlayLists",
                column: "UserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Profile_AspNetUsers_UserId",
                table: "Profile",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlayLists_AspNetUsers_UserId",
                table: "PlayLists");

            migrationBuilder.DropForeignKey(
                name: "FK_PlayLists_AspNetUsers_UserId1",
                table: "PlayLists");

            migrationBuilder.DropForeignKey(
                name: "FK_Profile_AspNetUsers_UserId",
                table: "Profile");

            migrationBuilder.DropIndex(
                name: "IX_PlayLists_UserId1",
                table: "PlayLists");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "PlayLists");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateAdded",
                table: "PlayListSongs",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 9, 20, 8, 49, 3, 153, DateTimeKind.Utc).AddTicks(9839),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 10, 2, 13, 54, 41, 389, DateTimeKind.Utc).AddTicks(1441));

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateAdded",
                table: "PlayLists",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 9, 20, 8, 49, 3, 153, DateTimeKind.Utc).AddTicks(2474),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 10, 2, 13, 54, 41, 386, DateTimeKind.Utc).AddTicks(1838));

            migrationBuilder.AddForeignKey(
                name: "FK_PlayLists_AspNetUsers_UserId",
                table: "PlayLists",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Profile_AspNetUsers_UserId",
                table: "Profile",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
