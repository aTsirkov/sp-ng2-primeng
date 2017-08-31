<%@ Page Language="C#" MasterPageFile="../../_catalogs/masterpage/StarterBranding/Starter%20Publishing.master" inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" meta:progid="SharePoint.WebPartPage.Document" %>
<%@ Register tagprefix="SharePoint" namespace="Microsoft.SharePoint.WebControls" assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderId="PlaceHolderAdditionalPageHead" runat="server">
	<!-- При переносе изменить на новое расположение -->
	<base href="http://s502as-its-sp01/sites/RTMonitor/SiteAssets/GermionaT/">
	
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">

    <link href="main.css" rel="stylesheet"></head>
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