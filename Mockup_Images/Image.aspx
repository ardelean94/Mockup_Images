<%@ Page Title="Images" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true" CodeFile="Image.aspx.cs" Inherits="Image" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <div class="circle"></div>
    <div>
        <label for="uploadImage" class="btn">Upload Image</label>
        <input
            id="uploadImage"
            style="visibility: hidden"
            onchange="compressImage(event); return false;"
            type="file"
            accept="image/*"
        />
    </div>

    <div class="content">
        <button id="btnGetImage" class="btn" onclick="getImageFromIndexedDB(); return false;">Show stored images</button>
        <button id="btnSaveImage" class="btn" style="display: none;" onclick="saveImageToServerUsingWebMethod(); return false;">Post to server</button>
        <%--<asp:Button id="btnSaveImage" class="btn btn-hidden" OnClientClick="saveImageToServer(); return false;" Text="Post to server" runat="server" />--%>

        <button id="btnClear" class="btn" onclick="clearScreen(); return false;">Clear</button>
    </div>
    <div id="imagesInputArea">
        <h3>INPUT</h3>
        <table class="table">
            <tbody class="tbody"></tbody>
        </table>
    </div>
    <div id="imagesOutputArea">
        <h3>OUTPUT</h3>
        <table class="table">
            <tbody class="tbody"></tbody>
        </table>
    </div>
</asp:Content>
