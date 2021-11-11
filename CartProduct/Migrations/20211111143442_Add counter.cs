using Microsoft.EntityFrameworkCore.Migrations;

namespace CartProduct.Migrations
{
    public partial class Addcounter : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "counter",
                table: "tblCartProducts",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "counter",
                table: "tblCartProducts");
        }
    }
}
