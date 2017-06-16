var HTML5Demos;
(function (HTML5Demos) {
    var DriveHelper;
    (function (DriveHelper) {
        var LTSharePoint;
        (function (LTSharePoint) {
            (function (directoryItemValue) {
                directoryItemValue[directoryItemValue["Back"] = -1] = "Back";
            })(LTSharePoint.directoryItemValue || (LTSharePoint.directoryItemValue = {}));
            var directoryItemValue = LTSharePoint.directoryItemValue;
            (function (ItemType) {
                ItemType[ItemType["File"] = 0] = "File";
                ItemType[ItemType["Folder"] = 1] = "Folder";
            })(LTSharePoint.ItemType || (LTSharePoint.ItemType = {}));
            var ItemType = LTSharePoint.ItemType;
            var SharePointServerProperties = (function () {
                function SharePointServerProperties() {
                }
                return SharePointServerProperties;
            }());
            LTSharePoint.SharePointServerProperties = SharePointServerProperties;
            var SharePointItem = (function () {
                function SharePointItem() {
                }
                return SharePointItem;
            }());
            LTSharePoint.SharePointItem = SharePointItem;
            var SharePointPickerDlg = (function () {
                function SharePointPickerDlg() {
                    // Create shortcuts for the dialog UI elements 
                    this.dialogUI = {
                        pickerDialog: "#sharePointPickerDialog",
                        sharePointPickerTitleLabel: "#sharePointPickerTitle",
                        // To change server properties, when the picker is connected to server
                        setServerPropertiesBtn: "#setServerProperties",
                        connectToSharePointServerControls: {
                            div: "#connectToSharePointServerDiv",
                            sharePointServerTextInput: "#sharePointServer",
                            credentialsInputs: {
                                all: ".sharePointCredentials",
                                useCredentialsCheckbox: "#useCredentials",
                                usernameTextInput: "#sharePointCredentialsUsername",
                                passwordInput: "#sharePointCredentialsPassword",
                                domainTextInput: "#sharePointCredentialsDomain"
                            },
                        },
                        sharePointServerDirectoryControls: {
                            div: "#sharePointServerDirectoryDiv",
                            directoryItemsTableBodyElement: "#directoryItems",
                            directoryItemTableRows: ".directoryItem"
                        },
                        loadingIndicatorImg: "#sharePointPickerDialog_LoadingIndicator",
                        // Used as Ok(For connect to server),Open(When run open mode) and Upload(When run save mode)
                        OkBtn: "#sharePointPickerDialog_OK",
                        closeSharePointPickerBtns: ".closeSharePointPicker"
                    };
                    this._serverProperties = new SharePointServerProperties();
                    this.Init();
                }
                Object.defineProperty(SharePointPickerDlg.prototype, "openSuccess", {
                    set: function (value) {
                        this._openSuccess = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SharePointPickerDlg.prototype, "openCancel", {
                    set: function (value) {
                        this._openCancel = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SharePointPickerDlg.prototype, "saveSuccess", {
                    set: function (value) {
                        this._saveSuccess = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SharePointPickerDlg.prototype, "saveError", {
                    set: function (value) {
                        this._saveError = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SharePointPickerDlg.prototype, "saveCancel", {
                    set: function (value) {
                        this._saveCancel = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SharePointPickerDlg.prototype, "fileToSaveUrl", {
                    set: function (value) {
                        this._fileToSaveUri = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SharePointPickerDlg.prototype, "fileToSaveName", {
                    set: function (value) {
                        this._fileToSaveName = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                SharePointPickerDlg.prototype.Init = function () {
                    $(this.dialogUI.connectToSharePointServerControls.credentialsInputs.useCredentialsCheckbox).bind("change", $.proxy(this.useCredentialsCheckbox_CheckedChanged, this));
                    $(this.dialogUI.setServerPropertiesBtn).bind("click", $.proxy(this.setServerPropertiesBtn_Click, this));
                    $(this.dialogUI.OkBtn).bind("click", $.proxy(this.OkBtn_Click, this));
                    $(this.dialogUI.closeSharePointPickerBtns).bind("click", $.proxy(this.closeSharePointPickerBtns_BtnClicked, this));
                };
                SharePointPickerDlg.prototype.show = function (mode) {
                    // If picker mode changed, connect again
                    if (this._pickerMode != mode) {
                        this.disconnect();
                    }
                    this._pickerMode = mode;
                    if (this._connected) {
                        // If connected and run over same mode, show shared documents directory
                        this.getServerDocuments(null);
                    }
                    $(this.dialogUI.pickerDialog).modal();
                };
                SharePointPickerDlg.prototype.hide = function () {
                    $(this.dialogUI.pickerDialog).modal("hide");
                };
                SharePointPickerDlg.prototype.disconnect = function () {
                    this._connected = false;
                    // Show connect controls
                    $(this.dialogUI.connectToSharePointServerControls.div).show();
                    // Hide directory controls
                    $(this.dialogUI.sharePointServerDirectoryControls.div).hide();
                    $(this.dialogUI.setServerPropertiesBtn).hide();
                    this.clearConnectToSharePointServerControls();
                };
                SharePointPickerDlg.prototype.clearConnectToSharePointServerControls = function () {
                    $(this.dialogUI.connectToSharePointServerControls.credentialsInputs.useCredentialsCheckbox).prop('checked', false);
                    $(this.dialogUI.connectToSharePointServerControls.credentialsInputs.usernameTextInput).val("");
                    $(this.dialogUI.connectToSharePointServerControls.credentialsInputs.passwordInput).val("");
                    $(this.dialogUI.connectToSharePointServerControls.credentialsInputs.domainTextInput).val("");
                    $(this.dialogUI.connectToSharePointServerControls.credentialsInputs.all).prop("disabled", true);
                    $(this.dialogUI.sharePointPickerTitleLabel).text("SharePoint Server Properties");
                    $(this.dialogUI.OkBtn).text("OK");
                };
                SharePointPickerDlg.prototype.useCredentialsCheckbox_CheckedChanged = function (e) {
                    var useCredentials = $(this.dialogUI.connectToSharePointServerControls.credentialsInputs.useCredentialsCheckbox).is(':checked');
                    $(this.dialogUI.connectToSharePointServerControls.credentialsInputs.all).prop("disabled", !useCredentials);
                };
                SharePointPickerDlg.prototype.setServerPropertiesBtn_Click = function (e) {
                    this.disconnect();
                };
                SharePointPickerDlg.prototype.OkBtn_Click = function (e) {
                    if (this._connected) {
                        // Ok button will act as open or upload button
                        if (this._currentSelectedItem.type == ItemType.Folder) {
                            // Item is a folder
                            if (this._pickerMode == DriveHelper.Mode.Open) {
                                // Open mode, Navigate to the folder
                                this.getServerDocuments(this._currentSelectedItem.directory + "/" + this._currentSelectedItem.name);
                            }
                            else if (this._pickerMode == DriveHelper.Mode.Save) {
                                // Save mode, Upload file
                                this.uploadFile(this._currentSelectedItem.directory + "/" + this._currentSelectedItem.name);
                            }
                        }
                        else if (this._currentSelectedItem.type == ItemType.File) {
                            // Item is a file
                            if (this._pickerMode == DriveHelper.Mode.Open)
                                // Open mode, Download file
                                this.downloadFile();
                        }
                    }
                    else {
                        // Connect to server
                        var tempProperties = new SharePointServerProperties();
                        // Get the uri input value and check if it valid
                        tempProperties.uri = $(this.dialogUI.connectToSharePointServerControls.sharePointServerTextInput).val();
                        tempProperties.uri = tempProperties.uri.replace(/\\/g, "/");
                        if (!HTML5Demos.Utils.DemoHelper.isValidURI(tempProperties.uri)) {
                            window.alert("Invalid URL format");
                            return;
                        }
                        // If user check the use credentials checkbox, get the credentials inputs values
                        tempProperties.useCredentials = $(this.dialogUI.connectToSharePointServerControls.credentialsInputs.useCredentialsCheckbox).is(':checked');
                        if (tempProperties.useCredentials) {
                            tempProperties.userName = $(this.dialogUI.connectToSharePointServerControls.credentialsInputs.usernameTextInput).val();
                            if (tempProperties.userName == "" || tempProperties.userName == null) {
                                window.alert("Enter a valid user name");
                                return;
                            }
                            tempProperties.password = $(this.dialogUI.connectToSharePointServerControls.credentialsInputs.passwordInput).val();
                            tempProperties.domain = $(this.dialogUI.connectToSharePointServerControls.credentialsInputs.domainTextInput).val();
                        }
                        this._serverProperties = tempProperties;
                        // Connect to the server, and get shared documents list items 
                        this.getServerDocuments(null);
                    }
                };
                SharePointPickerDlg.prototype.closeSharePointPickerBtns_BtnClicked = function (e) {
                    // When picker closed by user, fire cancel event
                    if (this._pickerMode == DriveHelper.Mode.Open) {
                        if (this._openCancel != null)
                            this._openCancel();
                    }
                    else if (this._pickerMode == DriveHelper.Mode.Save) {
                        if (this._saveCancel != null)
                            this._saveCancel();
                    }
                };
                SharePointPickerDlg.prototype.getServerDocuments = function (folderUri) {
                    var _this = this;
                    // Use folderUri to navigate to a sub folder in the shared documents list
                    $(this.dialogUI.loadingIndicatorImg).show();
                    // Set service Uri, and request parameters
                    var serviceUri = [lt.Documents.DocumentFactory.serviceUri, "SharePoint", "GetDocumentsListItems"].join("/");
                    var params = {
                        serverProperties: this._serverProperties,
                        folderUri: folderUri
                    };
                    $.ajax({
                        url: serviceUri,
                        'type': "POST",
                        contentType: "application/json",
                        data: JSON.stringify(params),
                        headers: { "cache-control": "no-cache" }
                    }).done(function (items) {
                        if (!_this._connected) {
                            // Set Shared Documents path
                            var str = _this._serverProperties.uri.substring(_this._serverProperties.uri.indexOf("://") + 3);
                            _this._sharedDocumentsDirectory = str.substring(str.indexOf("/")) + "Shared Documents";
                            $(_this.dialogUI.setServerPropertiesBtn).show();
                            _this._connected = true;
                        }
                        _this._sharePointItems = new Array();
                        _this._sharePointItems.push.apply(_this._sharePointItems, items);
                        // Sort the array by type, so the folders are at the top
                        if (_this._sharePointItems != null && _this._sharePointItems.length > 0) {
                            _this._sharePointItems.sort(function (a, b) { return (b.type - a.type); });
                        }
                        _this._currentDirectory = folderUri != null ? folderUri : _this._sharedDocumentsDirectory;
                        _this.showDirectory();
                    })
                        .fail(function (xhr, statusText, errorThrown) {
                        HTML5Demos.Utils.DemoHelper.showRequestError(xhr, statusText, errorThrown);
                    })
                        .always(function () {
                        $(_this.dialogUI.loadingIndicatorImg).hide();
                    });
                };
                SharePointPickerDlg.prototype.downloadFile = function () {
                    var _this = this;
                    $(this.dialogUI.loadingIndicatorImg).show();
                    // Set service Uri, and request parameters
                    var serviceUri = [lt.Documents.DocumentFactory.serviceUri, "SharePoint", "DownloadFile"].join("/");
                    var params = {
                        serverProperties: this._serverProperties,
                        fileUri: this._currentSelectedItem.directory + "/" + this._currentSelectedItem.name
                    };
                    $.ajax({
                        url: serviceUri,
                        'type': "POST",
                        contentType: "application/json",
                        data: JSON.stringify(params),
                        headers: { "cache-control": "no-cache" }
                    }).done(function (base64) {
                        var data = lt.LTHelper.base64DecodeToByteArray(base64);
                        var byteArray = new Uint8Array(data);
                        // Create drive file
                        var file = new DriveHelper.DriveFile(_this._currentSelectedItem.name);
                        file.fileBlob = new Blob([byteArray]);
                        // Fire success event
                        _this.hide();
                        if (_this._openSuccess != null)
                            _this._openSuccess(file);
                    })
                        .fail(function (xhr, statusText, errorThrown) {
                        HTML5Demos.Utils.DemoHelper.showRequestError(xhr, statusText, errorThrown);
                    })
                        .always(function () {
                        $(_this.dialogUI.loadingIndicatorImg).hide();
                    });
                };
                SharePointPickerDlg.prototype.uploadFile = function (folderUri) {
                    var _this = this;
                    this.hide();
                    // Set service Uri, and request parameters
                    var serviceUri = [lt.Documents.DocumentFactory.serviceUri, "SharePoint", "UploadFile"].join("/");
                    var params = {
                        serverProperties: this._serverProperties,
                        fileUri: this._fileToSaveUri,
                        name: this._fileToSaveName,
                        folderUri: folderUri
                    };
                    $.ajax({
                        url: serviceUri,
                        'type': "POST",
                        contentType: "application/json",
                        data: JSON.stringify(params),
                        headers: { "cache-control": "no-cache" }
                    }).done(function () {
                        if (_this._saveSuccess != null)
                            _this._saveSuccess();
                    })
                        .fail(function (xhr, statusText, errorThrown) {
                        if (_this._saveError != null)
                            _this._saveError(errorThrown);
                    });
                };
                SharePointPickerDlg.prototype.showDirectory = function () {
                    // Set picker title
                    $(this.dialogUI.sharePointPickerTitleLabel).text(this._serverProperties.uri + this._currentDirectory);
                    // Set Ok button text
                    $(this.dialogUI.OkBtn).text(this._pickerMode == DriveHelper.Mode.Open ? "Open" : "Upload");
                    // Hide connect controls
                    $(this.dialogUI.connectToSharePointServerControls.div).hide();
                    // Show directory controls
                    $(this.dialogUI.sharePointServerDirectoryControls.div).show();
                    var directoryItemsTable = "";
                    // Add back button, when current directory is not the shared documents directory
                    // So we can navigate back to previous directory
                    if (this._currentDirectory != this._sharedDocumentsDirectory) {
                        directoryItemsTable += "<tr>";
                        directoryItemsTable += "<td data-value='" + directoryItemValue.Back + "' class='directoryItem undoIcon'>Back</td>";
                        directoryItemsTable += "</tr>";
                    }
                    if (this._sharePointItems != null && this._sharePointItems.length > 0) {
                        $(this.dialogUI.OkBtn).prop('disabled', false);
                        for (var key in this._sharePointItems) {
                            if (this._sharePointItems.hasOwnProperty(key)) {
                                var item = this._sharePointItems[key];
                                // Show files only at open mode
                                if (this._pickerMode == DriveHelper.Mode.Open || item.type == ItemType.Folder) {
                                    directoryItemsTable += "<tr>";
                                    var iconCssClass = item.type == ItemType.Folder ? "folder" : "file";
                                    directoryItemsTable += "<td data-value='" + key + "' class='directoryItem " + iconCssClass + "'>" + item.name + "</td>";
                                    directoryItemsTable += "</tr>";
                                }
                            }
                        }
                    }
                    else {
                        $(this.dialogUI.OkBtn).prop('disabled', this._pickerMode == DriveHelper.Mode.Open);
                        directoryItemsTable += "<tr>";
                        directoryItemsTable += "<td style='text-align:center;'>This folder is empty</td>";
                        directoryItemsTable += "</tr>";
                        $(this.dialogUI.sharePointServerDirectoryControls.directoryItemsTableBodyElement).html(directoryItemsTable);
                    }
                    $(this.dialogUI.sharePointServerDirectoryControls.directoryItemsTableBodyElement).html(directoryItemsTable);
                    // Bind click and doubleclick events
                    $(this.dialogUI.sharePointServerDirectoryControls.directoryItemTableRows).bind("click", $.proxy(this.directoryItemTableRows_Click, this));
                    $(this.dialogUI.sharePointServerDirectoryControls.directoryItemTableRows).dblclick($.proxy(this.directoryItemTableRows_dbClick, this));
                };
                SharePointPickerDlg.prototype.directoryItemTableRows_Click = function (e) {
                    var rows = $(this.dialogUI.sharePointServerDirectoryControls.directoryItemTableRows);
                    // Unmarke all table rows
                    HTML5Demos.Utils.DemoHelper.checked(rows, false);
                    // Mark the selected one
                    HTML5Demos.Utils.DemoHelper.checked($(e.currentTarget), true);
                    var itemIndex = parseInt($(e.currentTarget).data("value"));
                    if (itemIndex != directoryItemValue.Back) {
                        this._currentSelectedItem = this._sharePointItems[itemIndex];
                    }
                    else {
                        // Back
                        this._currentDirectory = this._currentDirectory.substring(0, this._currentDirectory.lastIndexOf("/"));
                        this.getServerDocuments(this._currentDirectory);
                    }
                    if (HTML5Demos.Utils.DemoHelper.isTouchDevice()) {
                        var itemIndex = parseInt($(e.currentTarget).data("value"));
                        if (itemIndex == directoryItemValue.Back) {
                            // If back, do nothing
                            return;
                        }
                        if (this._currentSelectedItem.type == ItemType.Folder)
                            this.getServerDocuments(this._currentSelectedItem.directory + "/" + this._currentSelectedItem.name);
                    }
                };
                SharePointPickerDlg.prototype.directoryItemTableRows_dbClick = function (e) {
                    var itemIndex = parseInt($(e.currentTarget).data("value"));
                    if (itemIndex == directoryItemValue.Back) {
                        // If back, do nothing
                        return;
                    }
                    if (this._currentSelectedItem.type == ItemType.Folder)
                        this.getServerDocuments(this._currentSelectedItem.directory + "/" + this._currentSelectedItem.name);
                    else if (this._currentSelectedItem.type == ItemType.File)
                        this.downloadFile();
                };
                return SharePointPickerDlg;
            }());
            LTSharePoint.SharePointPickerDlg = SharePointPickerDlg;
        })(LTSharePoint = DriveHelper.LTSharePoint || (DriveHelper.LTSharePoint = {}));
    })(DriveHelper = HTML5Demos.DriveHelper || (HTML5Demos.DriveHelper = {}));
})(HTML5Demos || (HTML5Demos = {}));
