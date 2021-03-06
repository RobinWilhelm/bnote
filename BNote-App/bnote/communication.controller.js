sap.ui.controller("bnote.communication",{
	
	onInit: function() {
		this.alreadyDone = false;
	},
	
	getData: function() {		
		if (this.alreadyDone == false){
		var oController = this;		
        jQuery.ajax({
			url : backend.get_url("getGroups"),
			type : "POST",			
			success : function(data) {
				  var model = new sap.ui.model.json.JSONModel(data);
				  communicationView.setModel(model);				 
					for (var i = 0; model.getProperty("/group/" + i + "/name") != undefined; i++) {
						communicationView.communicationForm.addContent(new sap.m.CheckBox({
							text : model.getProperty("/group/" + i + "/name"),
							selected: "{/group/" + i + "/selected}"
						}));
					}
					communicationView.communicationForm.addContent(new sap.m.Button({
						text : "Senden",
						press: function(){
							var subject = model.getProperty("/subject");
							var body = model.getProperty("/body");
							var groups = model.getProperty("/group");
							var groupids = [];
							for(var i = 0;i < groups.length;i++){
								if(groups[i].selected){
									groupids.push(groups[i].id);
								}
							}
							var requestdata = {subject: subject, body: body, groups: groupids.join(",")};							
							jQuery.ajax({
						        	url: backend.get_url("sendMail"),
						            type: "POST",          	         
						            data: requestdata, 
						            success: function(data) {
						            	oController.resetForm();
						            	sap.m.MessageToast.show("Senden erfolgreich");						           
						            },
						            error: function(a,b,c) {
						                sap.m.MessageToast.show("Senden fehlgeschlagen");
						                console.log(b + ": " + c);
						            }
						       });
						}
					}));
			},
			error : function(a, b, c) {
				console.log(a, b, c);
			}
		});
        this.alreadyDone = true;
		}
		else {
			return;
		}
	},
	
	resetForm: function(){
		var model = communicationView.getModel();
		model.setProperty("/subject", "");
		model.setProperty("/body", "");
		var groups = model.getProperty("/group");
		var groupids = [];
		for(var i = 0;i < groups.length;i++){
			if(groups[i].selected){
				model.setProperty("/group/" + i + "/selected", false);
			}
		}		
	}
});