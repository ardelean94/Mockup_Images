<%@ WebHandler Language="C#" Class="Manifest" %>

using System;
using System.Web;

public class Manifest : IHttpHandler {

    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/cache-manifest";
        context.Response.WriteFile(context.Server.MapPath("Manifest.txt"));
        //context.Response.Write("Hello World");
    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}