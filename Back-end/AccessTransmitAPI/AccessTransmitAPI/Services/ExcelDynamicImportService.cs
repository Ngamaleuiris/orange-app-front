using OfficeOpenXml;
using System.Data;

namespace AccessTransmitAPI.Services
{
    public class ExcelDynamicImportService
{
    private readonly string _baseDirectory = Path.Combine(Directory.GetCurrentDirectory(), "Resources");

    public ExcelDynamicImportService()
    {

    }

    public (List<string> headers, List<Dictionary<string, string>> rows) ReadExcelDynamic(string toolName)
    {
        string filePath = Path.Combine(_baseDirectory, $"{toolName.ToUpper()}Users.xlsx");

        if (!File.Exists(filePath))
            throw new FileNotFoundException($"Le fichier {filePath} est introuvable.");

        var data = new List<Dictionary<string, string>>();
        var headers = new List<string>();

        using (var package = new ExcelPackage(new FileInfo(filePath)))
        {
            var worksheet = package.Workbook.Worksheets[0];
            int rowCount = worksheet.Dimension.Rows;
            int colCount = worksheet.Dimension.Columns;

            // Lire les en-têtes
            for (int col = 1; col <= colCount; col++)
            {
                headers.Add(worksheet.Cells[1, col].Text);
            }

            // Lire les lignes
            for (int row = 2; row <= rowCount; row++)
            {
                var rowData = new Dictionary<string, string>();
                for (int col = 1; col <= colCount; col++)
                {
                    string header = headers[col - 1];
                    string value = worksheet.Cells[row, col].Text;
                    rowData[header] = value;
                }
                data.Add(rowData);
            }
        }

        return (headers, data);
    }
}

}
