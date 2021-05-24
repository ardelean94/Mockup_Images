using System;
using System.IO;
using System.Web.Services;
using System.Text.Json;
using System.Threading.Tasks;
using Newtonsoft.Json;

public partial class Image : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        
    }

    [WebMethod]
    public static string SaveImageToFile(string imageData)
    {
        TextWriter writer = null;
        try
        {
            ////OLD WAY
            //var filePath = Path.Combine(@"C:\Users\Alex\source\repos\indexedDB-dexie-demo-webSite\Mockup_Images\Mockup_Images\LocalDB\imageRecord", ".json");
            //var contentsToWriteToFile = JsonConvert.DeserializeObject(imageData);
            ////var contentsToWriteToFile = JsonSerializer.Deserialize<Images>(imageData);
            //writer = new StreamWriter(filePath);
            //writer.Write(contentsToWriteToFile);


            Images images = System.Text.Json.JsonSerializer.Deserialize<Images>(imageData);
            string filePath = @"C:\Users\Alex\source\repos\indexedDB-dexie-demo-webSite\Mockup_Images\Mockup_Images\LocalDB\imageRecord_" + images.Id.ToString() + ".json";
            File.WriteAllText(filePath, imageData);

            return imageData;
        }
        catch (Exception e)
        {
            return e.Message;
        }
        finally
        {
            if (writer != null)
                writer.Close();
        }
    }
}