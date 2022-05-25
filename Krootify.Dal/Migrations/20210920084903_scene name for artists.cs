using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Dal.Migrations
{
    public partial class scenenameforartists : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "DateAdded",
                table: "PlayListSongs",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 9, 20, 8, 49, 3, 153, DateTimeKind.Utc).AddTicks(9839),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 9, 11, 8, 53, 21, 372, DateTimeKind.Utc).AddTicks(7601));

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateAdded",
                table: "PlayLists",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 9, 20, 8, 49, 3, 153, DateTimeKind.Utc).AddTicks(2474),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 9, 11, 8, 53, 21, 372, DateTimeKind.Utc).AddTicks(1636));

            migrationBuilder.AddColumn<string>(
                name: "SceneName",
                table: "Artists",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SceneName",
                table: "Artists");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateAdded",
                table: "PlayListSongs",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 9, 11, 8, 53, 21, 372, DateTimeKind.Utc).AddTicks(7601),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 9, 20, 8, 49, 3, 153, DateTimeKind.Utc).AddTicks(9839));

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateAdded",
                table: "PlayLists",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 9, 11, 8, 53, 21, 372, DateTimeKind.Utc).AddTicks(1636),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 9, 20, 8, 49, 3, 153, DateTimeKind.Utc).AddTicks(2474));
        }
    }
}
