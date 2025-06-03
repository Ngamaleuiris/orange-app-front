using Microsoft.EntityFrameworkCore.Migrations;

namespace AccessTransmitAPI.Migrations
{
    public partial class statutsuspend : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsActive",
                table: "UserIMONITOR",
                newName: "IsSuspended");

            migrationBuilder.RenameColumn(
                name: "IsActive",
                table: "UserNCE",
                newName: "IsSuspended");

            migrationBuilder.RenameColumn(
                name: "IsActive",
                table: "UserNFMP",
                newName: "IsSuspended");

            migrationBuilder.RenameColumn(
                name: "IsActive",
                table: "UserNOMAD",
                newName: "IsSuspended");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsSuspended",
                table: "UserIMONITOR",
                newName: "IsActive");

            migrationBuilder.RenameColumn(
                name: "IsSuspended",
                table: "UserNCE",
                newName: "IsActive");

            migrationBuilder.RenameColumn(
                name: "IsSuspended",
                table: "UserNFMP",
                newName: "IsActive");

            migrationBuilder.RenameColumn(
                name: "IsSuspended",
                table: "UserNOMAD",
                newName: "IsActive");
        }
    }
} 