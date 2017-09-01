<%@ Page Language="C#" Inherits="Microsoft.SharePoint.WebPartPages.WikiEditPage" MasterPageFile="~masterurl/default.master"      MainContentID="PlaceHolderMain" %>
<%@ Register TagPrefix="WpNs0" Namespace="Microsoft.SharePoint.Portal.WebControls" Assembly="Microsoft.SharePoint.Portal, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"%>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyTok %>
<%@ Assembly Name="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"%>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Import Namespace="Microsoft.SharePoint.WebPartPages" %>
<%@ Import Namespace="Microsoft.SharePoint" %>


<asp:Content ContentPlaceHolderId="PlaceHolderPageTitle" runat="server">
	<SharePoint:ProjectProperty Property="Title" runat="server"/> - <SharePoint:ListItemProperty runat="server"/>
</asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderPageImage" runat="server"><SharePoint:AlphaImage ID=onetidtpweb1 Src="/_layouts/15/images/wiki.png?rev=23" Width=145 Height=54 Alt="" Runat="server"/></asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderAdditionalPageHead" runat="server">
	<base href="http://s502as-its-sp01/sites/RTMonitor/SiteAssets/GermionaT/">
	
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="CollaborationServer" content="SharePoint Team Web Site" />

    <link href="main.css" rel="stylesheet"></head>

</asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderMiniConsole" runat="server">
	<SharePoint:FormComponent TemplateName="WikiMiniConsole" ControlMode="Display" runat="server" id="WikiMiniConsole"/>
</asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderLeftActions" runat="server">
	<SharePoint:RecentChangesMenu runat="server" id="RecentChanges"/>
</asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderMain" runat="server">
	<div>
		<app>
			<div class="splash">
				<div class="message">Идет загрузка приложения...</div>
				<div class="spinner"></div>
			</div>
		</app>
		<!-- Place the compiled Js below-->
		<script type="text/javascript" src="polyfills.js"></script>
		<script type="text/javascript" src="main.js"></script>
	</div>
</asp:Content>