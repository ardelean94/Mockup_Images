using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

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
            var filePath = Path.Combine(@"C:\Users\Alex\source\repos\indexedDB-dexie-demo-webSite\Mockup_Images\Mockup_Images\LocalDB\imageRecord.json");    
            var contentsToWriteToFile = JsonConvert.DeserializeObject(imageData);
            writer = new StreamWriter(filePath);
            writer.Write(contentsToWriteToFile);

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