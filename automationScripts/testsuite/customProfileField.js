var config = require('../../config/config.json');
var forumLogin = require('./forum_login.js');
var forumRegister = require('./register.js');
var registerData=require('../testdata/registerData.json');
var loginData=require('../testdata/loginData.json')
var field_permission = module.exports = {};
   
    
	field_permission.field_permissionfeatureTest=function(casper, test){
		
		//*********************************************************************	
      casper.on("page.error", function(msg, trace) {
	    	 this.echo("Error:    " + msg, "ERROR");
		     this.echo("file:     " + trace[0].file, "WARNING");
	     	 this.echo("line:     " + trace[0].line, "WARNING");
		     this.echo("function: " + trace[0]["function"], "WARNING");
		errors.push(msg);
	    });
	  
	  /*
     ***************************************************************************************************************************************************
	                                   ------------- ShortAnswerField ---------
	****************************************************************************************************************************************************
	  */
	  
     	//Verify 1 : verify by add "short answer" fields for registration
	casper.start('https://beta12.websitetoolbox.com/tool/members/login', function() {
	    
		this.echo('*********************************************************************************************************************', 'INFO');
		this.echo('----------------------------------------ShortAnswerField------------------------------------------------------', 'INFO');
		this.echo('*********************************************************************************************************************', 'INFO');
		
		this.echo('verify by add short answer fields for registration', 'INFO');
		  //Open Back-End URL And Get Title
	      field_permission.OpenBackEndURL(casper, function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)
			    field_permission.fillDataToCustomProfileField(casper, 'Short answer', '1field', '<b>my name is khan</b>','1','','','','','','','',   function(err) {
					if(!err){
					    //Logout To Forum Back End
                         field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
							 //Open Front-End URL And Get Title
							 casper.thenOpen(config.url, function sucess() {
								casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                             this.test.assertExists('a[href="/register/register"]');
		                             this.click('a[href="/register/register"]');
									 casper.waitForSelector('form[name="PostTopic"]', function sucess () {
                                            casper.test.assertExists('form[name="PostTopic"]');	
                                                //Method For verifyMessage										
                                               field_permission.verifyMessage(casper,function(err) { 											
				                                     if(!err){
                                                           //Method For Filling Data In Registration Form(Front end)
                                                            forumRegister.registerToApp(registerData.validregister, casper, function sucess(err) {	
                                                            if(!err){
											                    forumRegister.redirectToLogout(casper,test,function sucess(e){
													                  if(!e){
														                 casper.echo("logout sucess", 'INFO');
														               }
													            }); 
												            }	
											            });	
                                                    }
                                                });									
						            },function fail(){this.echo("Member registration form is not found",'ERROR');});
								},function fail(){this.echo("Member registration form is not found",'ERROR');});
				            });
				            } 
				        });
				    }   	
				});	
            }		 
		});
		
		
       	     //Verify 2: Verify by add a "short answer" fields  without check any check box/uncheck all the check box
	casper.thenOpen(config.backEndUrl,function(){
		 this.echo('**************************Case 2***************************', 'INFO');
		 this.echo('Verify by add a "short answer" fields  without check any check box/uncheck all the check box', 'INFO');
		   //Open Back-End URL And Get Title
	      field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)
			    field_permission.fillDataToCustomProfileField(casper, 'Short answer', 'displaycheak', '<b>my name is khan</b>','','','','','','','','',   function(err) {
					if(!err){
					    //Logout To Forum Back End
                         field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
							 //Open Front-End URL And Get Title
							 casper.thenOpen(config.url, function sucess() {
								casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                             this.test.assertExists('a[href="/register/register"]');
		                             this.click('a[href="/register/register"]');
									 casper.waitForSelector('form[name="PostTopic"]', function sucess () {
                                            casper.test.assertExists('form[name="PostTopic"]');	
                                         //Method For verifyMessage										
				                            field_permission.verifyMessage(casper,function(err) { 											
				                                     if(!err){
                                                         casper.echo('....................verifyMessagecode excute sucessful.............');
                                                   }
                                            });								 
						            },function fail(){this.echo("Member registration form is not found",'ERROR');});
								},function fail(){this.echo("Registration link  not found",'ERROR');});
				            });
				            } 
				        });
				    }   	
				});	
            }
        			 
		 });
							
    });
         
		        
	     	//Verify  3.1.1: "Verify by add a ""short answer" fields for registration page "verify  without enter required short answer filed
	casper.thenOpen(config.backEndUrl, function(){
	        this.echo('**************************Case 3(without fill req)***************************', 'INFO');
		    this.echo('Verify by add a ""short answer"" fields for registration page "verify  without enter required short answer filed', 'INFO');	
			//Open Back-End URL And Get Title
	      field_permission.OpenBackEndURL(casper, function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)
			    field_permission.fillDataToCustomProfileField(casper, 'Short answer', 'reqfield', '<b>my name is khan</b>','1','1','','','','','','',   function(err) {
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
							 //Open Front-End URL And Get Title
							 casper.thenOpen(config.url, function sucess() {
								casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                             this.test.assertExists('a[href="/register/register"]');
		                             this.click('a[href="/register/register"]');
									 casper.waitForSelector('form[name="PostTopic"]', function sucess () {
                                            casper.test.assertExists('form[name="PostTopic"]');										
				                              //field verification											
				                            field_permission.verifyMessage(casper,function(err) { 											
				                                     if(!err){
                                        casper.echo('....................verifyMessagecode excute sucessful.............');
                                          
											 casper.waitForSelector('form[name="PostTopic"]', function sucess () {
						                         casper.fillXPath('form[name="PostTopic"]', {
					                            '//*[@id="inputusername"]':    '00409erwsdf0gd',
					                            '//*[@id="inputemail"]':    '0300ddsd@gmail.com',
					                            '//*[@id="inputpassword"]':   'rlraj',
					                            //'//*[@id="signature"]':       '06/05/1984',
				
					                             '//*[@id="rules_checkbox"]':         true
					                               }, false);
						                         this.click('form[name="PostTopic"] button' );		
						
						                         casper.waitForSelector('div.alert.alert-danger.text-center', function begin() {
							                         this.test.assertExists('div.alert.alert-danger.text-center');
							                         var msg = casper.fetchText('div.alert.alert-danger.text-center');
								                     this.echo("message : "+msg, 'INFO');	
						                        },function fail(){});
						                    },function fail(){this.echo("Member registration form is not found",'ERROR');}); 
                                        }
                                          });		
						            },function fail(){this.echo("Member registration form is not found",'ERROR');});
								},function fail(){this.echo("Registration link  not found",'ERROR');});
				            });
				            } 
				        });
				    }   	
				});	
            }
        			 
		 });
			 
										
		});
			
		
			//Verify  3.1.2 :Verify by add a "short answer" fields for registration page "verify  with enter required short answer filed

	casper.thenOpen(config.backEndUrl,function(){
	    this.echo('**************************Case 3(fill req)***************************', 'INFO');
		this.echo('Verify by add a ""short answer"" fields for registration page "verify  with enter required short answer filed', 'INFO');
			//Open Back-End URL And Get Title
	      field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)
			    field_permission.fillDataToCustomProfileField(casper, 'Short answer', 'reqfield', '<b>my name is khan</b>','1','1','','','','','','',   function(err) {
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
							 //Open Front-End URL And Get Title
							 casper.thenOpen(config.url, function sucess() {
								casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                             this.test.assertExists('a[href="/register/register"]');
		                             this.click('a[href="/register/register"]');
									 casper.waitForSelector('form[name="PostTopic"]', function sucess () {
                                            casper.test.assertExists('form[name="PostTopic"]');										
				                               //field verification											
				                            field_permission.verifyMessage(casper,function(err) { 											
				                                     if(!err){
                                                            casper.echo('....................verifyMessagecode excute sucessful.............');
                                                        }
                                                });	
											    
						            },function fail(){this.echo("Member registration form is not found",'ERROR');});
								},function fail(){this.echo("Registration link  not found",'ERROR');});
				            });
				            } 
				        });
				    }   	
				});	
            }
        			 
		 });
			
										
        
	});	
				
				
			//Verify  4 :Verify by add a "short answer" fields for registration page which is searchable

	casper.thenOpen(config.backEndUrl,function(){
	    this.echo('**************************Case 4***************************', 'INFO');
		this.echo('Verify by add a ""short answer"" fields for registration page which is searchable', 'INFO');
		  //Open Back-End URL And Get Title
	      field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)
			    field_permission.fillDataToCustomProfileField(casper, 'Short answer', 'searchablefield', '<b>my name is khan</b>','1','','1','','','','','', function(err) {
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
							 //Open Front-End URL And Get Title
							 casper.thenOpen(config.url, function sucess() {
								casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                             this.test.assertExists('a[href="/register/register"]');
		                             this.click('a[href="/register/register"]');
									 //Method For Verify Data In Member Registration Form(Front end)
				                     field_permission.verifyDataToRegistrationForm(casper,'searchablefield' ,   function(err) {
					                     if(!err){
				                           casper.echo('....................frontend code excute sucessful.............');
				                        } 
					                });	
								},function fail(){this.echo("Member registration form is not found",'ERROR');});
				            });
				            } 
				        });
				    }   	
				});	
            }
        			 
		 });
	});
			
			
			
			//Verify  5 :Verify by add a ""short answer"" fields for registration page which is private
	casper.thenOpen(config.backEndUrl,function(){
	        this.echo('**************************Case 5***************************', 'INFO');
			this.echo('Verify by add a ""short answer"" fields for registration page which is private', 'INFO');
             //Open Back-End URL And Get Title
	      field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)
			    field_permission.fillDataToCustomProfileField(casper, 'Short answer', 'privatecheak', '<b>my name is khan</b>','1','','','1','','','','', function(err) {	
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
							 //Open Front-End URL And Get Title
							 casper.thenOpen(config.url, function sucess() {
								casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                             this.test.assertExists('a[href="/register/register"]');
		                             this.click('a[href="/register/register"]');
									 //Method For Verify Data In Member Registration Form(Front end)
				                     field_permission.verifyDataToRegistrationForm(casper,'privatecheak' ,   function(err) {
					                     if(!err){
				                           casper.echo('....................frontend code excute sucessful.............');
				                        } 
					                });
									
								},function fail(){this.echo("Member registration form is not found",'ERROR');});
				            });
				            } 
				        });
				    }   	
				});	
            }
        			 
		 });																			
		});
			
						
			//Verify  6 :"Verify by add a ""short answer"" fields for registration page  which is Editable by User
	casper.thenOpen(config.backEndUrl,function(){
			this.echo('**************************Case 6***************************', 'INFO');
		    this.echo('Verify by add a ""short answer"" fields for registration page  which is Editable by User', 'INFO');	
              //Open Back-End URL And Get Title
	      field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)
			    field_permission.fillDataToCustomProfileField(casper, 'Short answer', 'editablefield', '<b>my name is khan</b>','1','','1','','','1','','', function(err) {	
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
							 //Open Front-End URL And Get Title
							 casper.thenOpen(config.url, function sucess() {
								casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                             this.test.assertExists('a[href="/register/register"]');
		                             this.click('a[href="/register/register"]');
									 //Method For Verify Data In Member Registration Form(Front end)
				                     field_permission.verifyDataToRegistrationForm(casper,'editablefield' ,   function(err) {
					                     if(!err){
				                           casper.echo('....................frontend code excute sucessful.............');
				                        } 
					                });
									
								},function fail(){this.echo("Member registration form is not found",'ERROR');});
				            });
				            } 
				        });
				    }   	
				});	
            }
        			 
		 });			
			  
		});
			
			
			//Verify  7 :"Verify by add a ""short answer"" fields for registration page which is Show on Members List
	casper.thenOpen(config.backEndUrl,function(){
		 this.echo('**************************Case 7***************************', 'INFO');
		 this.echo('Verify by add a ""short answer"" fields for registration page which is Show on Members List', 'INFO');
		     //Open Back-End URL And Get Title
	      field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)
			    field_permission.fillDataToCustomProfileField(casper, 'Short answer', 'memberfield', '<b>my name is khan</b>','1','1','1','','','1','','', function(err) {
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
							 //Open Front-End URL And Get Title
							 casper.thenOpen(config.url, function sucess() {
								casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                             this.test.assertExists('a[href="/register/register"]');
		                             this.click('a[href="/register/register"]');
									 //Method For Verify Data In Member Registration Form(Front end)
				                     field_permission.verifyDataToRegistrationForm(casper,'memberfield' ,   function(err) {
					                     if(!err){
				                           casper.echo('....................frontend code excute sucessful.............');
				                        } 
					                });
									
								},function fail(){this.echo("Member registration form is not found",'ERROR');});
				            });
				            } 
				        });
				    }   	
				});	
            }
        			 
		 });
	   
	});
			
				
			//Verify  8 :Verify by add a ""short answer"" fields for registration page without adding title
	casper.thenOpen(config.backEndUrl,function(){
	         this.echo('**************************Case 8***************************', 'INFO');
			 this.echo('Verify by add a ""short answer"" fields for registration page without adding title', 'INFO');
			  //Open Back-End URL And Get Title
	      field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)
			    field_permission.fillDataToCustomProfileField(casper, 'Short answer', '', '<b>my name is khan</b>','1','1','1','','','1','','The field title is required', function(err) {
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
				                           casper.echo('....................frontend code excute sucessful.............');
				            } 
				        });
				    }   	
				});	
            }
        			 
		 });
			   
		});
		
		
		//Verify 9: verify with delete multiple custom profile field
	casper.thenOpen(config.backEndUrl,function(){
		this.echo('Delete module***************************', 'INFO');
		//Delete Field To Forum Front End
	    field_permission.deleteField(casper,function(err) { 
				if(!err){
							  // this.echo('....................field not be deleted ............');
				} 
			});
		  
	});
			 
		
		/*
     ***************************************************************************************************************************************************
	                                   ------------- Paragraph ---------
	****************************************************************************************************************************************************
	  */
		
		   //Verify 1 : verify by add paragraph fields for registration
	casper.thenOpen(config.backEndUrl, function() {
	
	this.echo('*********************************************************************************************************************', 'INFO');
	  this.echo('----------------------------------------Paragraph ------------------------------------------------------', 'INFO');
	  this.echo('*********************************************************************************************************************', 'INFO');
	    
	
		this.echo('**************************Case 1***************************', 'INFO');
		this.echo('verify by add paragraph fields for registration', 'INFO');
		//Open Back-End URL And Get Title
	      field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)
			    field_permission.fillDataToCustomProfileField(casper, 'Short answer', '1field', '<b>my name is khan</b>','1','','','','','','','',   function(err) {
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
							 //Open Front-End URL And Get Title
							 casper.thenOpen(config.url, function sucess() {
								casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                             this.test.assertExists('a[href="/register/register"]');
		                             this.click('a[href="/register/register"]');
									 casper.waitForSelector('form[name="PostTopic"]', function sucess () {
                                            casper.test.assertExists('form[name="PostTopic"]');										
				                               //Method For verifyMessage										
                                               field_permission.verifyMessage(casper,function(err) { 											
				                                     if(!err){
                                                           //Method For Filling Data In Registration Form(Front end)
                                                            forumRegister.registerToApp(registerData.validregister, casper, function sucess(err) {	
                                                            if(!err){
											                    forumRegister.redirectToLogout(casper,test,function sucess(e){
													                  if(!e){
														                 casper.echo("logout sucess", 'INFO');
														               }
													            }); 
												            }	
											            });	
                                                    }
                                                });	  
						            },function fail(){this.echo("Member registration form is not found",'ERROR');});
								},function fail(){this.echo("Member registration form is not found",'ERROR');});
				            });
				            } 
				        });
				    }   	
				});	
            }
        			 
		 });
		 
	});

	
       	     //Verify 2: Verify by add a "paragraph" fields  without check any check box/uncheck all the check box
	casper.thenOpen(config.backEndUrl,function(){
		 this.echo('**************************Case 2***************************', 'INFO');
		 this.echo('Verify by add a "paragraph" fields  without check any check box/uncheck all the check box', 'INFO');
		   //Open Back-End URL And Get Title
	      field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)
			    field_permission.fillDataToCustomProfileField(casper, 'textarea', 'displaycheak', '<b>my name is khan</b>','','','','','','','','',   function(err) {
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
							 //Open Front-End URL And Get Title
							 casper.thenOpen(config.url, function sucess() {
								casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                             this.test.assertExists('a[href="/register/register"]');
		                             this.click('a[href="/register/register"]');
									 casper.waitForSelector('form[name="PostTopic"]', function sucess () {
                                            casper.test.assertExists('form[name="PostTopic"]');										
				                              //Method For verifyMessage										
				                            field_permission.verifyMessage(casper,function(err) { 											
				                                     if(!err){
                                                         casper.echo('....................verifyMessagecode excute sucessful.............');
                                                   }
                                            }); 
						            },function fail(){this.echo("Member registration form is not found",'ERROR');});
								},function fail(){this.echo("Registration link  not found",'ERROR');});
				            });
				            } 
				        });
				    }   	
				});	
            }
        			 
		 });
		 	
                 						
    });
        
		         
	     	//Verify  3.1.1: "Verify by add a "paragraph" fields for registration page "verify  without enter required short answer filed
	casper.thenOpen(config.backEndUrl,function(){
	        this.echo('**************************Case 3(without fill req)***************************', 'INFO');
		    this.echo('Verify by add a ""paragraph"" fields for registration page "verify  without enter required short answer filed', 'INFO');	
			//Open Back-End URL And Get Title
	      field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)
			    field_permission.fillDataToCustomProfileField(casper, 'textarea', 'reqfield', '<b>my name is khan</b>','1','1','','','','','','',   function(err) {
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
							 //Open Front-End URL And Get Title
							 casper.thenOpen(config.url, function sucess() {
								casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                             this.test.assertExists('a[href="/register/register"]');
		                             this.click('a[href="/register/register"]');
									 casper.waitForSelector('form[name="PostTopic"]', function sucess () {
                                            casper.test.assertExists('form[name="PostTopic"]');										
				                           //field verification											
				                            field_permission.verifyMessage(casper,function(err) { 											
				                                     if(!err){
                                        casper.echo('....................verifyMessagecode excute sucessful.............');
                                          
											 casper.waitForSelector('form[name="PostTopic"]', function sucess () {
						                         casper.fillXPath('form[name="PostTopic"]', {
					                            '//*[@id="inputusername"]':    '00409erwsdf0gd',
					                            '//*[@id="inputemail"]':    '0300ddsd@gmail.com',
					                            '//*[@id="inputpassword"]':   'rlraj',
					                            //'//*[@id="signature"]':       '06/05/1984',
				
					                             '//*[@id="rules_checkbox"]':         true
					                               }, false);
						                         this.click('form[name="PostTopic"] button' );		
						
						                         casper.waitForSelector('div.alert.alert-danger.text-center', function begin() {
							                         this.test.assertExists('div.alert.alert-danger.text-center');
							                         var msg = casper.fetchText('div.alert.alert-danger.text-center');
								                     this.echo("message : "+msg, 'INFO');	
						                        },function fail(){});
						                    },function fail(){this.echo("Member registration form is not found",'ERROR');}); 
                                        }
                                          });
						            },function fail(){this.echo("Member registration form is not found",'ERROR');});
								},function fail(){this.echo("Registration link  not found",'ERROR');});
				            });
				            } 
				        });
				    }   	
				});	
            }
        			 
		 });
			
			
										
		});
			
		
			//Verify  3.1.2 :Verify by add a "paragraph" fields for registration page "verify  with enter required short answer filed

	casper.thenOpen(config.backEndUrl,function(){
	    this.echo('**************************Case 3(fill req)***************************', 'INFO');
		this.echo('Verify by add a ""paragraph"" fields for registration page "verify  with enter required short answer filed', 'INFO');
			//Open Back-End URL And Get Title
	      field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)
			    field_permission.fillDataToCustomProfileField(casper, 'textarea', 'reqfield', '<b>my name is khan</b>','1','1','','','','','','',   function(err) {
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
							 //Open Front-End URL And Get Title
							 casper.thenOpen(config.url, function sucess() {
								casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                             this.test.assertExists('a[href="/register/register"]');
		                             this.click('a[href="/register/register"]');
									 casper.waitForSelector('form[name="PostTopic"]', function sucess () {
                                            casper.test.assertExists('form[name="PostTopic"]');										
				                          //Method For verifyMessage										
				                            field_permission.verifyMessage(casper,function(err) { 											
				                                     if(!err){
                                                         casper.echo('....................verifyMessagecode excute sucessful.............');
                                                   }
                                            });
											    
						            },function fail(){this.echo("Member registration form is not found",'ERROR');});
								},function fail(){this.echo("Registration link  not found",'ERROR');});
				            });
				            } 
				        });
				    }   	
				});	
            }
        			 
		 });
		 
										
	});	
				
				
			//Verify  4 :Verify by add a ""paragraph" fields for registration page which is searchable

	casper.thenOpen(config.backEndUrl,function(){
	    this.echo('**************************Case 4***************************', 'INFO');
		this.echo('Verify by add a "paragraph" fields for registration page which is searchable', 'INFO');
		 //Open Back-End URL And Get Title
	      field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)
			    field_permission.fillDataToCustomProfileField(casper, 'textarea', 'searchablefield', '<b>my name is khan</b>','1','','1','','','','','', function(err) {
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
							 //Open Front-End URL And Get Title
							 casper.thenOpen(config.url, function sucess() {
								casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                             this.test.assertExists('a[href="/register/register"]');
		                             this.click('a[href="/register/register"]');
									 //Method For Verify Data In Member Registration Form(Front end)
				                     field_permission.verifyDataToRegistrationForm(casper,'searchablefield' ,   function(err) {
					                     if(!err){
				                           casper.echo('....................frontend code excute sucessful.............');
				                        } 
					                });
									
								},function fail(){this.echo("Member registration form is not found",'ERROR');});
				            });
				            } 
				        });
				    }   	
				});	
            }
        			 
		 });
		
			
	});
			
			
			
			//Verify  5 :Verify by add a "paragraph" fields for registration page which is private
	casper.thenOpen(config.backEndUrl,function(){
	        this.echo('**************************Case 5***************************', 'INFO');
			this.echo('Verify by add a "paragraph" fields for registration page which is private', 'INFO');	
			  //Open Back-End URL And Get Title
	      field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)
			    field_permission.fillDataToCustomProfileField(casper, 'textarea', 'privatecheak', '<b>my name is khan</b>','1','','','1','','','','', function(err) {	
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
							 //Open Front-End URL And Get Title
							 casper.thenOpen(config.url, function sucess() {
								casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                             this.test.assertExists('a[href="/register/register"]');
		                             this.click('a[href="/register/register"]');
									 //Method For Verify Data In Member Registration Form(Front end)
				                     field_permission.verifyDataToRegistrationForm(casper,'privatecheak' ,   function(err) {
					                     if(!err){
				                           casper.echo('....................frontend code excute sucessful.............');
				                        } 
					                });
									
								},function fail(){this.echo("Member registration form is not found",'ERROR');});
				            });
				            } 
				        });
				    }   	
				});	
            }
        			 
		 });
            			
		  														
		});
			
					
			//Verify  6 :"Verify by add a "paragraph" fields for registration page  which is Editable by User
	casper.thenOpen(config.backEndUrl,function(){
			this.echo('**************************Case 6***************************', 'INFO');
		    this.echo('Verify by add a "paragraph" fields for registration page  which is Editable by User', 'INFO');	
            //Open Back-End URL And Get Title
	      field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)
			    field_permission.fillDataToCustomProfileField(casper, 'textarea', 'editablefield', '<b>my name is khan</b>','1','','','','','1','','', function(err) {	
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
							 //Open Front-End URL And Get Title
							 casper.thenOpen(config.url, function sucess() {
								casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                             this.test.assertExists('a[href="/register/register"]');
		                             this.click('a[href="/register/register"]');
									 //Method For Verify Data In Member Registration Form(Front end)
				                     field_permission.verifyDataToRegistrationForm(casper,'editablefield' ,   function(err) {
					                     if(!err){
				                           casper.echo('....................frontend code excute sucessful.............');
				                        } 
					                });
									
								},function fail(){this.echo("Member registration form is not found",'ERROR');});
				            });
				            } 
				        });
				    }   	
				});	
            }
        			 
		 });			
            		 
		});
			
			
			//Verify  7 :"Verify by add a ""paragraph"" fields for registration page which is Show on Members List
	casper.thenOpen(config.backEndUrl,function(){
		 this.echo('**************************Case 7***************************', 'INFO');
		 this.echo('Verify by add a ""paragraph"" fields for registration page which is Show on Members List', 'INFO');
		   //Open Back-End URL And Get Title
	      field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)
			 field_permission.fillDataToCustomProfileField(casper, 'textarea', 'memberfield', '<b>my name is khan</b>','1','1','1','','','1','','', function(err) {
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
							 //Open Front-End URL And Get Title
							 casper.thenOpen(config.url, function sucess() {
								casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                             this.test.assertExists('a[href="/register/register"]');
		                             this.click('a[href="/register/register"]');
									 //Method For Verify Data In Member Registration Form(Front end)
				                     field_permission.verifyDataToRegistrationForm(casper,'memberfield' ,   function(err) {
					                     if(!err){
				                           casper.echo('....................frontend code excute sucessful.............');
				                        } 
					                });
									
								},function fail(){this.echo("Member registration form is not found",'ERROR');});
				            });
				            } 
				        });
				    }   	
				});	
            }
        			 
		 });
		
	   
	});
			
				
			//Verify  8 :Verify by add a ""short answer"" fields for registration page without adding title
	casper.thenOpen(config.backEndUrl,function(){
	         this.echo('**************************Case 8***************************', 'INFO');
			 this.echo('Verify by add a "paragraph"" fields for registration page without adding title', 'INFO');
			  //Open Back-End URL And Get Title
	      field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)
			    field_permission.fillDataToCustomProfileField(casper, 'textarea', '', '<b>my name is khan</b>','1','1','1','','','1','','The field title is required', function(err) {
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
				                           casper.echo('....................frontend code excute sucessful.............');
				            } 
				        });
				    }   	
				});	
            }
        			 
		 });
			 
        
		});
       
		
	  //Verify 9: verify with delete multiple custom profile field
	casper.thenOpen(config.backEndUrl,function(){
		this.echo('Delete module***************************', 'INFO');
		//Delete Field To Forum Front End
	    field_permission.deleteField(casper,function(err) { 
				if(!err){
							  // this.echo('....................field not be deleted ............');
				} 
			});
		  
	});
	  
	/*
     ***************************************************************************************************************************************************
	                                   -------------  Multiplechoice ---------
	****************************************************************************************************************************************************
	  */
	  
		
	//Verify 1 : Verify by add a "Multiple choice" fields for registration page	
	casper.thenOpen(config.backEndUrl, function() {
	
	  	this.echo('*********************************************************************************************************************', 'INFO');
	  this.echo('----------------------------------------Multiplechoice ------------------------------------------------------', 'INFO');
	  this.echo('*********************************************************************************************************************', 'INFO');
	
		this.echo('**************************Case 1***************************', 'INFO');
		//Open Back-End URL And Get Title
	      field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)
			    field_permission.fillDataToCustomProfileField(casper, 'radio', '1field', '<b>my name is khan</b>','1','','','','','','1aa','',   function(err) {
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
							 //Open Front-End URL And Get Title
							 casper.thenOpen(config.url, function sucess() {
								casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                             this.test.assertExists('a[href="/register/register"]');
		                             this.click('a[href="/register/register"]');
									 casper.waitForSelector('form[name="PostTopic"]', function sucess () {
                                            casper.test.assertExists('form[name="PostTopic"]');										
				                              //Method For verifyMessage										
                                               field_permission.verifyMessage(casper,function(err) { 											
				                                     if(!err){
                                                           //Method For Filling Data In Registration Form(Front end)
                                                            forumRegister.registerToApp(registerData.validregister, casper, function sucess(err) {	
                                                            if(!err){
											                    forumRegister.redirectToLogout(casper,test,function sucess(e){
													                  if(!e){
														                 casper.echo("logout sucess", 'INFO');
														               }
													            }); 
												            }	
											            });	
                                                    }
                                                });	 
						            },function fail(){this.echo("Member registration form is not found",'ERROR');});
								},function fail(){this.echo("Member registration form is not found",'ERROR');});
				            });
				            } 
				        });
				    }   	
				});	
            }		 
		});
		
		});
		
		
     //Verify 2: Verify by add a "Multiple choice " fields without check any check box/uncheck all the check box
	casper.thenOpen(config.backEndUrl,function(){
		  this.echo('**************************Case 2***************************', 'INFO');
		  this.echo('Verify by add a "Multiple choice " fields without check any check box/uncheck all the check box', 'INFO');
		   //Open Back-End URL And Get Title
	       field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)
			    field_permission.fillDataToCustomProfileField(casper, 'radio', 'displaycheak', '<b>my name is khan</b>','','','','','','','dia','',  function(err) {
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
							    //Open Front-End URL And Get Title
							    casper.thenOpen(config.url, function sucess() {
								     casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                                this.test.assertExists('a[href="/register/register"]');
		                                this.click('a[href="/register/register"]');
									    casper.waitForSelector('form[name="PostTopic"]', function sucess () {
                                            casper.test.assertExists('form[name="PostTopic"]');										
				                                //Method For verifyMessage										
				                            field_permission.verifyMessage(casper,function(err) { 											
				                                     if(!err){
                                                         casper.echo('....................verifyMessagecode excute sucessful.............');
                                                   }
                                            }); 
						                },function fail(){this.echo("Member registration form is not found",'ERROR');});
								    },function fail(){this.echo("Registration link  not found",'ERROR');});
				                });
				            } 
				        });
				    }   	
				});	
            }			 
		});	  
    });
	
        
		         
	 //Verify  3: Verify by add a "Multiple choice " fields for registration page without adding title
	casper.thenOpen(config.backEndUrl,function(){
		this.echo('**************************Case 3(without fill req)***************************', 'INFO');
		this.echo('Verify by add a "Multiple choice " fields for registration page without adding title', 'INFO');
		  //Open Back-End URL And Get Title
	      field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)
			    field_permission.fillDataToCustomProfileField(casper, 'radio', '', '<b>my name is khan</b>','1','1','1','','','1','aler','The field title is required', function(err) {
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
				                           casper.echo('....................frontend code excute sucessful.............');
				            } 
				        });
				    }   	
				});	
            }		 
		});       
	});
			
	   	
				
	//Verify  4 :Verify by add a "Multiple choice " fields for registration page without adding options for choice
	casper.thenOpen(config.backEndUrl,function(){
	    this.echo('**************************Case 4***************************', 'INFO');
		this.echo('Verify by add a "Multiple choice " fields for registration page without adding options for choice', 'INFO');
		 //Open Back-End URL And Get Title
		 field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)
			    field_permission.fillDataToCustomProfileField(casper, 'radio', 'alert', '<b>my name is khan</b>','1','1','1','','','1','','You must specify the field options', function(err) {
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
				                           casper.echo('....................frontend code excute sucessful.............');
				            } 
				        });
				    }   	
				});	
            }		 
		});
    });
			
		
	//Verify  5 :"Verify by add a ""Multiple choice "" fields for registration page make frist option  as default"
	casper.thenOpen(config.backEndUrl,function(){
	   this.echo('**************************Case 5***************************', 'INFO');
	   this.echo('Verify by add a ""Multiple choice "" fields for registration page make frist option  as default', 'INFO');
	    //Open Back-End URL And Get Title
	     field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
				casper.waitForSelector('a[href="fields?action=new_edit_field&new=1"]', function sucess() {
					this.test.assertExists('a[href="fields?action=new_edit_field&new=1"]');
					this.click('a[href="fields?action=new_edit_field&new=1"]');               
					casper.waitForSelector('form[name="frm_fields"]', function sucess() {
						this.test.assertExists('form[name="frm_fields"]', 'custom profile field Form Found');
						this.test.assertExists('#fieldtype');
						this.click('select#fieldtype');
						this.test.assertExists('option[value="checkbox"] ');
						this.click('option[value="checkbox"]');
						this.test.assertExists('#display_register');
						this.click('#display_register');
						this.test.assertExists('#first_default');
						this.click('#first_default');
						this.test.assertExists('a#addFieldOption ');
						this.click('a#addFieldOption ');
						this.test.assertExists('a#addFieldOption');
						this.click('a#addFieldOption');
						this.fill('form[name="frm_fields"]',{
					   'fieldtype': 'radio',
					   'fieldname': 'optioncheak',
					   'description': '<b>my name is khan</b>',
					   'display_register': '1',
						'first_default':'1'	,
						'limit_selection' : '2',
							'option1':'A',
							'option2':'B',
							'option3':'C'								
						},true);
						casper.waitForSelector('div#feedback', function sucess() {
							var msg = casper.fetchText('div p[align="center"]');
							this.echo("message : "+msg, 'INFO');
							//Logout To Forum Back End
                             field_permission.BackEndLogout(casper,function(err) { 
				                if(!err){
							        //Open Front-End URL And Get Title
							        casper.thenOpen(config.url, function sucess() {
								         casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                                     this.test.assertExists('a[href="/register/register"]');
		                                     this.click('a[href="/register/register"]');
									         casper.waitForSelector('form[name="PostTopic"]', function sucess () {
                                                 casper.test.assertExists('form[name="PostTopic"]');										
				                                     //Method For verifyMessage										
				                            field_permission.verifyMessage(casper,function(err) { 											
				                                     if(!err){
                                                         casper.echo('....................verifyMessagecode excute sucessful.............');
                                                   }
                                            }); 
						                    },function fail(){this.echo("Member registration form is not found",'ERROR');});
								        },function fail(){this.echo("Registration link  not found",'ERROR');});
				                    });
				                } 
				            });										 										
						},function fail(){this.echo(" custom profile field message is not generated",'ERROR');});
					},function fail(){this.echo("custom profile field not found",'ERROR');})
				},function fail(){this.echo("Add new field button link found",'ERROR');});
            }		 
		});   
	});
			
						
	//Verify  6 : "Verify by add a ""Multiple choice"" fields for registration page which is required"

	casper.thenOpen(config.backEndUrl,function(){
		this.echo('**************************Case 6***************************', 'INFO');
		this.echo('Verify by add a ""Multiple choicer"" fields for registration page which is required"', 'INFO');
		//Open Back-End URL And Get Title
	      field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)
			 field_permission.fillDataToCustomFieldOption(casper, 'radio', 'reqfield', '<b>my name is khan</b>','1','1','','','','','ra','rb','rc','2','','', function(err) {
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
							 //Open Front-End URL And Get Title
							 casper.thenOpen(config.url, function sucess() {
								casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                             this.test.assertExists('a[href="/register/register"]');
		                             this.click('a[href="/register/register"]');
									 casper.waitForSelector('form[name="PostTopic"]', function sucess () {
                                            casper.test.assertExists('form[name="PostTopic"]');										
				                                 //Method For verifyMessage										
				                            field_permission.verifyMessage(casper,function(err) { 											
				                                     if(!err){
                                                         casper.echo('....................verifyMessagecode excute sucessful.............');
                                                   }
                                            }); 
											    
						            },function fail(){this.echo("Member registration form is not found",'ERROR');});
								},function fail(){this.echo("Registration link  not found",'ERROR');});
				            });
				            } 
				        });
				    }   	
				});	
            }
        			 
		 });

			});
			
		
	//Verify  7 : "Verify by add a ""Multiple choice"" fields for registration page >which is searchable"

	casper.thenOpen(config.backEndUrl,function(){
		this.echo('**************************Case 7***************************', 'INFO');
		this.echo('Verify by add a ""Multiple choice"" fields for registration page >which is searchable', 'INFO');
		 //Open Back-End URL And Get Title
	      field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)
			    field_permission.fillDataToCustomProfileField(casper, 'radio', 'searchablefield', '<b>my name is khan</b>','1','','1','','','','sea','', function(err) {
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
							 //Open Front-End URL And Get Title
							 casper.thenOpen(config.url, function sucess() {
								casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                             this.test.assertExists('a[href="/register/register"]');
		                             this.click('a[href="/register/register"]');
									 //Method For Verify Data In Member Registration Form(Front end)
				                     field_permission.verifyDataToRegistrationForm(casper,'searchablefield' ,   function(err) {
					                     if(!err){
				                           casper.echo('....................frontend code excute sucessful.............');
				                        } 
					                });
									
								},function fail(){this.echo("Member registration form is not found",'ERROR');});
				            });
				            } 
				        });
				    }   	
				});	
            }
        			 
		 });
         	   
			});
			
			
	//Verify  8 : "Verify by add a ""Multiple choice"" fields for registration page >which is Private"

	casper.thenOpen(config.backEndUrl,function(){
	this.echo('**************************Case 8***************************', 'INFO');
	this.echo('"Verify by add a ""Multiple choice"" fields for registration page >which is Private', 'INFO');
		  //Open Back-End URL And Get Title
	      field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)
			    field_permission.fillDataToCustomProfileField(casper, 'radio', 'privatecheak', '<b>my name is khan</b>','1','','','1','','','pri','', function(err) {		
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
							 //Open Front-End URL And Get Title
							 casper.thenOpen(config.url, function sucess() {
								casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                             this.test.assertExists('a[href="/register/register"]');
		                             this.click('a[href="/register/register"]');
									 //Method For Verify Data In Member Registration Form(Front end)
				                     field_permission.verifyDataToRegistrationForm(casper,'privatecheak' ,   function(err) {
					                     if(!err){
				                           casper.echo('....................frontend code excute sucessful.............');
				                        } 
					                });
									
								},function fail(){this.echo("Member registration form is not found",'ERROR');});
				            });
				            } 
				        });
				    }   	
				});	
            }
        			 
		 });
	        
        
			});
			
			
			
	//Verify  9 : "Verify by add a ""Multiple choice"" fields for registration page which is Editable by User"

	casper.thenOpen(config.backEndUrl,function(){
	this.echo('**************************Case 9***************************', 'INFO');
	this.echo('Verify by add a ""Multiple choice"" fields for registration page which is Editable by User"', 'INFO');
		//Open Back-End URL And Get Title
	      field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)
			    field_permission.fillDataToCustomProfileField(casper, 'radio', 'editablefield', '<b>my name is khan</b>','1','','1','','','1','edi','', function(err) {	
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
							 //Open Front-End URL And Get Title
							 casper.thenOpen(config.url, function sucess() {
								casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                             this.test.assertExists('a[href="/register/register"]');
		                             this.click('a[href="/register/register"]');
									 //Method For Verify Data In Member Registration Form(Front end)
				                     field_permission.verifyDataToRegistrationForm(casper,'editablefield' ,   function(err) {
					                     if(!err){
				                           casper.echo('....................frontend code excute sucessful.............');
				                        } 
					                });
									
								},function fail(){this.echo("Member registration form is not found",'ERROR');});
				            });
				            } 
				        });
				    }   	
				});	
            }
        			 
		 });
	       		
        
			});
			
			
	//Verify  10 : "Verify by add a ""Multiple choice"" fields for registration page > which is Show on Members List"

	casper.thenOpen(config.backEndUrl,function(){
	this.echo('**************************Case 10***************************', 'INFO');
	this.echo('Verify by add a ""Multiple choice"" fields for registration page > which is Show on Members List', 'INFO');
	   //Open Back-End URL And Get Title
	      field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)
			    field_permission.fillDataToCustomProfileField(casper, 'radio', 'memberfield', '<b>my name is khan</b>','1','','','','','1','mem','', function(err) {
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
							 //Open Front-End URL And Get Title
							 casper.thenOpen(config.url, function sucess() {
								casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                             this.test.assertExists('a[href="/register/register"]');
		                             this.click('a[href="/register/register"]');
									 //Method For Verify Data In Member Registration Form(Front end)
				                     field_permission.verifyDataToRegistrationForm(casper,'memberfield' ,   function(err) {
					                     if(!err){
				                           casper.echo('....................frontend code excute sucessful.............');
				                        } 
					                });
									
								},function fail(){this.echo("Member registration form is not found",'ERROR');});
				            });
				            } 
				        });
				    }   	
				});	
            }
        			 
		 });
			
	       	
        
			});
      
	  
     //Verify 11: verify with delete multiple custom profile field
	casper.thenOpen(config.backEndUrl,function(){
		this.echo('Delete module***************************', 'INFO');
		//Delete Field To Forum Front End
	    field_permission.deleteField(casper,function(err) { 
				if(!err){
							  // this.echo('....................field not be deleted ............');
				} 
			});
		  
	}); 
		
	
/*
     ***************************************************************************************************************************************************
	                                   -------------   DropDown  ---------
	****************************************************************************************************************************************************
	  */
	
	 //Verify 1 : Verify by add a "drop down" fields for registration page
	 casper.thenOpen(config.backEndUrl, function() {
	 
	  this.echo('*********************************************************************************************************************', 'INFO');
	  this.echo('----------------------------------------DropDown*------------------------------------------------------', 'INFO');
	  this.echo('*********************************************************************************************************************', 'INFO');
	
	 
	 this.echo('**************************Case 1***************************', 'INFO');
	  this.echo(' Verify by add a "drop down"" fields for registration page', 'INFO');
	  //Open Back-End URL And Get Title
	      field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)
			    field_permission.fillDataToCustomProfileField(casper, 'select_single', 'hello','<b>my name is khan</b>','1','','','','','','dia','',   function(err) {
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
							 //Open Front-End URL And Get Title
							 casper.thenOpen(config.url, function sucess() {
								casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                             this.test.assertExists('a[href="/register/register"]');
		                             this.click('a[href="/register/register"]');
									 casper.waitForSelector('form[name="PostTopic"]', function sucess () {
                                            casper.test.assertExists('form[name="PostTopic"]');										
				                            //Method For verifyMessage										
                                               field_permission.verifyMessage(casper,function(err) { 											
				                                     if(!err){
                                                           //Method For Filling Data In Registration Form(Front end)
                                                            forumRegister.registerToApp(registerData.validregister, casper, function sucess(err) {	
                                                            if(!err){
											                    forumRegister.redirectToLogout(casper,test,function sucess(e){
													                  if(!e){
														                 casper.echo("logout sucess", 'INFO');
														               }
													            }); 
												            }	
											            });	
                                                    }
                                                });											
						            },function fail(){this.echo("Member registration form is not found",'ERROR');});
								},function fail(){this.echo("Member registration form is not found",'ERROR');});
				            });
				            } 
				        });
				    }   	
				});	
            }
        			 
		});
	 });
	  
		
		
		
     //Verify 2: Verify by add a "drop down"  fields without check any check box/uncheck all the check box
	 casper.thenOpen(config.backEndUrl,function(){
	 this.echo('**************************Case 2***************************', 'INFO');
	 this.echo('Verify by add a "drop down" " fields without check any check box/uncheck all the check box', 'INFO');
	    //Open Back-End URL And Get Title
	     field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)
			    field_permission.fillDataToCustomProfileField(casper, 'select_single', 'displaycheak', '<b>my name is khan</b>','','','','','','','dia','',  function(err) {
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
							    //Open Front-End URL And Get Title
							    casper.thenOpen(config.url, function sucess() {
								    casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                                this.test.assertExists('a[href="/register/register"]');
		                                this.click('a[href="/register/register"]');
									    casper.waitForSelector('form[name="PostTopic"]', function sucess () {
                                            casper.test.assertExists('form[name="PostTopic"]');										
				                               //Method For verifyMessage										
				                            field_permission.verifyMessage(casper,function(err) { 											
				                                     if(!err){
                                                         casper.echo('....................verifyMessagecode excute sucessful.............');
                                                   }
                                            });   
						                },function fail(){this.echo("Member registration form is not found",'ERROR');});
								    },function fail(){this.echo("Registration link  not found",'ERROR');});
				                });
				            } 
				        });
				    }   	
				});	
            }			 
		});
    });
        
		      
	  
	//Verify  3: Verify by add a "drop down" fields for registration page without adding title
	 casper.thenOpen(config.backEndUrl,function(){
	 this.echo('**************************Case 3(without fill req)***************************', 'INFO');
	 this.echo('Verify by add a drop down" " fields for registration page without adding title', 'INFO');
	     //Open Back-End URL And Get Title
	     field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)
			    field_permission.fillDataToCustomProfileField(casper, 'select_single', '', '<b>my name is khan</b>','1','1','1','','','1','aler','The field title is required', function(err) {
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
				                           casper.echo('....................frontend code excute sucessful.............');
				            } 
				        });
				    }   	
				});	
            }
        			 
		});
	});			
			
				
	//Verify  4 :Verify by add a "drop down " fields for registration page without adding options for choice
	casper.thenOpen(config.backEndUrl,function(){
	    this.echo('**************************Case 4***************************', 'INFO');
		this.echo('Verify by add a "drop down" " fields for registration page without adding options for choice', 'INFO');
		 //Open Back-End URL And Get Title
         field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)
                field_permission.fillDataToCustomProfileField(casper, 'select_single', 'alert', '<b>my name is khan</b>','1','1','1','','','1','','You must specify the field options', function(err) {
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
				                casper.echo('....................frontend code excute sucessful.............');
				            } 
				        });
				    }   	
				});	
            } 
		});        
	});
			
					
	//Verify  5 :"Verify by add a "drop down" fields for registration page make frist option  as default"
	casper.thenOpen(config.backEndUrl,function(){
	this.echo('**************************Case 5***************************', 'INFO');
	this.echo('Verify by add a ""drop down" "" fields for registration page make frist option  as default"', 'INFO');
	    //Open Back-End URL And Get Title
	     field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
				casper.waitForSelector('a[href="fields?action=new_edit_field&new=1"]', function sucess() {
					this.test.assertExists('a[href="fields?action=new_edit_field&new=1"]');
					this.click('a[href="fields?action=new_edit_field&new=1"]');               
					casper.waitForSelector('form[name="frm_fields"]', function sucess() {
						this.test.assertExists('form[name="frm_fields"]', 'custom profile field Form Found');
						this.test.assertExists('#fieldtype');
						this.click('select#fieldtype');
						this.test.assertExists('option[value="checkbox"] ');
						this.click('option[value="checkbox"]');
						this.test.assertExists('#display_register');
						this.click('#display_register');
						this.test.assertExists('#first_default');
						this.click('#first_default');
						this.test.assertExists('a#addFieldOption ');
						this.click('a#addFieldOption ');
						this.test.assertExists('a#addFieldOption');
						this.click('a#addFieldOption');
						this.fill('form[name="frm_fields"]',{
					   'fieldtype': 'select_single',
					   'fieldname': 'optioncheak',
					   'description': '<b>my name is khan</b>',
					   'display_register': '1',
						'first_default':'1'	,
						'limit_selection' : '2',
							'option1':'A',
							'option2':'B',
							'option3':'C'								
						},true);
						casper.waitForSelector('div#feedback', function sucess() {
							var msg = casper.fetchText('div p[align="center"]');
							this.echo("message : "+msg, 'INFO');
							//Logout To Forum Back End
                             field_permission.BackEndLogout(casper,function(err) { 
				                if(!err){
							        //Open Front-End URL And Get Title
							        casper.thenOpen(config.url, function sucess() {
								         casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                                     this.test.assertExists('a[href="/register/register"]');
		                                     this.click('a[href="/register/register"]');
									         casper.waitForSelector('form[name="PostTopic"]', function sucess () {
                                                 casper.test.assertExists('form[name="PostTopic"]');										
				                                  //Method For verifyMessage										
				                            field_permission.verifyMessage(casper,function(err) { 											
				                                     if(!err){
                                                         casper.echo('....................verifyMessagecode excute sucessful.............');
                                                   }
                                            });  
						                    },function fail(){this.echo("Member registration form is not found",'ERROR');});
								        },function fail(){this.echo("Registration link  not found",'ERROR');});
				                    });
				                } 
				            });										 										
						},function fail(){this.echo(" custom profile field message is not generated",'ERROR');});
					},function fail(){this.echo("custom profile field not found",'ERROR');})
				},function fail(){this.echo("Add new field button link found",'ERROR');});
            }		 
		});
					
	});
					
	           
	//Verify  6 : "Verify by add a "drop down" fields for registration page which is required"
	casper.thenOpen(config.backEndUrl,function(){
	this.echo('**************************Case 6***************************', 'INFO');
	this.echo('"Verify by add a ""drop down""" fields for registration page which is required"', 'INFO');
	//Open Back-End URL And Get Title
	      field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)
			    
				 field_permission.fillDataToCustomFieldOption(casper, 'select_single', 'reqfield', '<b>my name is khan</b>','1','1','','','','','ra','rb','rc','2','','', function(err) {
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
							 //Open Front-End URL And Get Title
							 casper.thenOpen(config.url, function sucess() {
								casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                             this.test.assertExists('a[href="/register/register"]');
		                             this.click('a[href="/register/register"]');
									 casper.waitForSelector('form[name="PostTopic"]', function sucess () {
                                            casper.test.assertExists('form[name="PostTopic"]');										
				                              //Method For verifyMessage										
				                            field_permission.verifyMessage(casper,function(err) { 											
				                                     if(!err){
                                                         casper.echo('....................verifyMessagecode excute sucessful.............');
                                                   }
                                            }); 
											    
						            },function fail(){this.echo("Member registration form is not found",'ERROR');});
								},function fail(){this.echo("Registration link  not found",'ERROR');});
				            });
				            } 
				        });
				    }   	
				});	
            }
        			 
		 });
	
	});
			
			
	//Verify  7 : "Verify by add a "drop down" fields for registration page >which is searchable"
	casper.thenOpen(config.backEndUrl,function(){
		this.echo('**************************Case 7***************************', 'INFO');
		this.echo('"Verify by add a ""drop down""" fields for registration page >which is searchable"', 'INFO');
		//Open Back-End URL And Get Title
	      field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)
			    field_permission.fillDataToCustomProfileField(casper, 'select_single', 'searchablefield', '<b>my name is khan</b>','1','','1','','','','sea','', function(err) {
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
							 //Open Front-End URL And Get Title
							 casper.thenOpen(config.url, function sucess() {
								casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                             this.test.assertExists('a[href="/register/register"]');
		                             this.click('a[href="/register/register"]');
									 //Method For Verify Data In Member Registration Form(Front end)
				                     field_permission.verifyDataToRegistrationForm(casper,'searchablefield' ,   function(err) {
					                     if(!err){
				                           casper.echo('....................frontend code excute sucessful.............');
				                        } 
					                });
									
								},function fail(){this.echo("Member registration form is not found",'ERROR');});
				            });
				            } 
				        });
				    }   	
				});	
            }
        			 
		 });
           
		});
			
				
	//Verify  8 : "Verify by add a "drop down" fields for registration page >which is Private"
	casper.thenOpen(config.backEndUrl,function(){
	this.echo('**************************Case 8***************************', 'INFO');
	this.echo('Verify by add a ""drop down""" fields for registration page >which is Private"', 'INFO');
	//Open Back-End URL And Get Title
	      field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)
			    field_permission.fillDataToCustomProfileField (casper, 'select_single', 'privatecheak', '<b>my name is khan</b>','1','','','1','','','pri','', function(err) {		
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
							 //Open Front-End URL And Get Title
							 casper.thenOpen(config.url, function sucess() {
								casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                             this.test.assertExists('a[href="/register/register"]');
		                             this.click('a[href="/register/register"]');
									 //Method For Verify Data In Member Registration Form(Front end)
				                     field_permission.verifyDataToRegistrationForm(casper,'privatecheak' ,   function(err) {
					                     if(!err){
				                           casper.echo('....................frontend code excute sucessful.............');
				                        } 
					                });
									
								},function fail(){this.echo("Member registration form is not found",'ERROR');});
				            });
				            } 
				        });
				    }   	
				});	
            }
        			 
		 });
			});
		
		
	//Verify  9 : "Verify by add a "drop down" fields for registration page which is Editable by User"
	casper.thenOpen(config.backEndUrl,function(){
	this.echo('**************************Case 9***************************', 'INFO');
	this.echo('Verify by add a ""drop down""" fields for registration page which is Editable by User"', 'INFO');
	 //Open Back-End URL And Get Title
	      field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)
			    field_permission.fillDataToCustomProfileField(casper, 'select_single', 'editablefield', '<b>my name is khan</b>','1','','','','1','','edi','', function(err) {	
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
							 //Open Front-End URL And Get Title
							 casper.thenOpen(config.url, function sucess() {
								casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                             this.test.assertExists('a[href="/register/register"]');
		                             this.click('a[href="/register/register"]');
									 //Method For Verify Data In Member Registration Form(Front end)
				                     field_permission.verifyDataToRegistrationForm(casper,'editablefield' ,   function(err) {
					                     if(!err){
				                           casper.echo('....................frontend code excute sucessful.............');
				                        } 
					                });
									
								},function fail(){this.echo("Member registration form is not found",'ERROR');});
				            });
				            } 
				        });
				    }   	
				});	
            }
        			 
		 });
			

	});
	
	
	//Verify  10 : "Verify by add a "drop down" fields for registration page > which is Show on Members List"
	casper.thenOpen(config.backEndUrl,function(){
	this.echo('**************************Case 10***************************', 'INFO');
	this.echo('"Verify by add a ""drop down"" fields for registration page > which is Show on Members List"', 'INFO');
	   //Open Back-End URL And Get Title
	      field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)
			    field_permission.fillDataToCustomProfileField(casper, 'select_single', 'memberfield', '<b>my name is khan</b>','1','','','','','1','mem','', function(err) {
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
							 //Open Front-End URL And Get Title
							 casper.thenOpen(config.url, function sucess() {
								casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                             this.test.assertExists('a[href="/register/register"]');
		                             this.click('a[href="/register/register"]');
									 //Method For Verify Data In Member Registration Form(Front end)
				                     field_permission.verifyDataToRegistrationForm(casper,'memberfield' ,   function(err) {
					                     if(!err){
				                           casper.echo('....................frontend code excute sucessful.............');
				                        } 
					                });
									
								},function fail(){this.echo("Member registration form is not found",'ERROR');});
				            });
				            } 
				        });
				    }   	
				});	
            }
        			 
		 });
	       	 
			});
			
			
	//Verify 11: verify with delete multiple custom profile field
	casper.thenOpen(config.backEndUrl,function(){
		this.echo('Delete module***************************', 'INFO');
		//Delete Field To Forum Front End
	    field_permission.deleteField(casper,function(err) { 
				if(!err){
							  // this.echo('....................field not be deleted ............');
				} 
			});
		  
	});
		
	/*
     ***************************************************************************************************************************************************
	                                   -------------   CHECKBOXESFIELD   ---------
	****************************************************************************************************************************************************
	  */
	 
	  //Verify 1 : Verify by add a "check boxes" fields for registration page
	casper.thenOpen(config.backEndUrl, function() {
	    
		
	  this.echo('*********************************************************************************************************************', 'INFO');
	  this.echo('----------------------------------------CHECKBOXESFIELD *------------------------------------------------------', 'INFO');
	  this.echo('*********************************************************************************************************************', 'INFO');
	  
		this.echo('**************************Case 1***************************', 'INFO');
		this.echo('Verify by add a "check boxes" fields for registration page', 'INFO');
		//Open Back-End URL And Get Title
	      field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)
				 field_permission.fillDataToCustomFieldOption(casper, 'checkbox', '1field', '<b>my name is khan</b>','1','','','','','','A','B','C','2','', '',  function(err) {
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
							 //Open Front-End URL And Get Title
							 casper.thenOpen(config.url, function sucess() {
								casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                             this.test.assertExists('a[href="/register/register"]');
		                             this.click('a[href="/register/register"]');
									 casper.waitForSelector('form[name="PostTopic"]', function sucess () {
                                            casper.test.assertExists('form[name="PostTopic"]');										
				                            //Method For verifyMessage										
				                            field_permission.verifyMessage(casper,function(err) { 											
				                                     if(!err){
                                                         casper.echo('....................verifyMessagecode excute sucessful.............');
														 casper.fillXPath('form[name="PostTopic"]', {
									                             '//input[starts-with(@name,"field")]':  ['A','B','C'],
								                            }, false);
                                                   }
                                            }); 
										
											
                                            
						            },function fail(){this.echo("Member registration form is not found",'ERROR');});
								},function fail(){this.echo("Member registration form is not found",'ERROR');});
				            });
				            } 
				        });
				    }   	
				});	
            }
        			 
		});
		
	});
			
		
    //Verify 2: Verify by add a "check boxes " fields for registration page without check any check box/uncheck all the check box
	casper.thenOpen(config.backEndUrl,function(){
		  this.echo('**************************Case 2***************************', 'INFO');
		  this.echo('Verify by add a "check boxes " fields for registration page without check any check box/uncheck all the check box', 'INFO');
	      //Open Back-End URL And Get Title
	      field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end) 
		  	    field_permission.fillDataToCustomFieldOption(casper, 'checkbox', 'displaycheak', '<b>my name is khan</b>','','','','','','','da','db','dc','2','','',  function(err) {
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
							    //Open Front-End URL And Get Title
							    casper.thenOpen(config.url, function sucess() {
								     casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                                this.test.assertExists('a[href="/register/register"]');
		                                this.click('a[href="/register/register"]');
									    casper.waitForSelector('form[name="PostTopic"]', function sucess () {
                                            casper.test.assertExists('form[name="PostTopic"]');										
				                               //Method For verifyMessage										
				                            field_permission.verifyMessage(casper,function(err) { 											
				                                     if(!err){
                                                         casper.echo('....................verifyMessagecode excute sucessful.............');
                                                   }
                                            });  
						                },function fail(){this.echo("Member registration form is not found",'ERROR');});
								    },function fail(){this.echo("Registration link  not found",'ERROR');});
				                });
				            } 
				        });
				    }   	
				});	
            }
        			 
		});	
    });
	
			
	 //Verify 3: Verify by add a "check boxes " fields for registration page without adding title
	casper.thenOpen(config.backEndUrl,function(){
		 this.echo('**************************Case 3 **************************', 'INFO');
		 this.echo(' Verify by add a "check boxes " fields for registration page without adding title', 'INFO');
		 //Open Back-End URL And Get Title
         field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)
			     field_permission.fillDataToCustomFieldOption(casper, 'checkbox', '', '<b>my name is khan</b>','1','1','1','','','1','ca','cb','cc','2','The field title is required','', function(err) {
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
				                 casper.echo('....................frontend code excute sucessful.............');
				            } 
				        });
				    }   	
				});	
            }		 
		});	
    });
			
		
	 //Verify 4: Verify by add a "check boxes " fields for registration page without adding options for check box
	casper.thenOpen(config.backEndUrl,function(){
		 this.echo('**************************Case 4***************************', 'INFO');
		 this.echo(' Verify by add a "check boxes " fields for registration page without adding options for check box', 'INFO');
		 //Open Back-End URL And Get Title
         field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)
			     field_permission.fillDataToCustomFieldOption(casper, 'checkbox', 'alert', '<b>my name is khan</b>','1','1','1','','','1','','ab','ac','2','You must specify the field options','', function(err) {
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
				                casper.echo('....................frontend code excute sucessful.............');
				            } 
				        });
				    }   	
				});	
            }
        			 
		});    
	});
		
            
          
	 //Verify 5: "Verify by add a "check boxes " fields for registration page make first option  as default"
	 casper.thenOpen(config.backEndUrl,function(){
		 this.echo('**************************Case 5***************************', 'INFO');
		 this.echo('Verify by add a ""check boxes "" fields for registration page make first option  as default"', 'INFO');
		  //Open Back-End URL And Get Title
	     field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
				casper.waitForSelector('a[href="fields?action=new_edit_field&new=1"]', function sucess() {
					this.test.assertExists('a[href="fields?action=new_edit_field&new=1"]');
					this.click('a[href="fields?action=new_edit_field&new=1"]');               
					casper.waitForSelector('form[name="frm_fields"]', function sucess() {
						this.test.assertExists('form[name="frm_fields"]', 'custom profile field Form Found');
						this.test.assertExists('#fieldtype');
						this.click('select#fieldtype');
						this.test.assertExists('option[value="checkbox"] ');
						this.click('option[value="checkbox"]');
						this.test.assertExists('#display_register');
						this.click('#display_register');
						this.test.assertExists('#first_default');
						this.click('#first_default');
						this.test.assertExists('a#addFieldOption ');
						this.click('a#addFieldOption ');
						this.test.assertExists('a#addFieldOption');
						this.click('a#addFieldOption');
						this.fill('form[name="frm_fields"]',{
					   'fieldtype': 'checkbox',
					   'fieldname': 'optioncheak',
					   'description': '<b>my name is khan</b>',
					   'display_register': '1',
						'first_default':'1'	,
						'limit_selection' : '2',
							'option1':'A',
							'option2':'B',
							'option3':'C'								
						},true);
						casper.waitForSelector('div#feedback', function sucess() {
							var msg = casper.fetchText('div p[align="center"]');
							this.echo("message : "+msg, 'INFO');
							//Logout To Forum Back End
                             field_permission.BackEndLogout(casper,function(err) { 
				                if(!err){
							        //Open Front-End URL And Get Title
							        casper.thenOpen(config.url, function sucess() {
								         casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                                     this.test.assertExists('a[href="/register/register"]');
		                                     this.click('a[href="/register/register"]');
									         casper.waitForSelector('form[name="PostTopic"]', function sucess () {
                                                 casper.test.assertExists('form[name="PostTopic"]');										
				                               //Method For verifyMessage										
				                            field_permission.verifyMessage(casper,function(err) { 											
				                                     if(!err){
                                                         casper.echo('....................verifyMessagecode excute sucessful.............');
                                                   }
                                            });   
						                    },function fail(){this.echo("Member registration form is not found",'ERROR');});
								        },function fail(){this.echo("Registration link  not found",'ERROR');});
				                    });
				                } 
				            });										 										
						},function fail(){this.echo(" custom profile field message is not generated",'ERROR');});
					},function fail(){this.echo("custom profile field not found",'ERROR');})
				},function fail(){this.echo("Add new field button link found",'ERROR');});
            }		 
		});
		 
    });
       
	   
    //Verify 6: "Verify by add a "check boxes" fields for registration page which is required"
	 casper.thenOpen(config.backEndUrl,function(){
		  this.echo('**************************Case 6***************************', 'INFO');
		  this.echo('Verify by add a ""check boxes"" fields for registration page which is required"', 'INFO');
		  //Open Back-End URL And Get Title
         field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			     //Method For Filling Data In Custom Profile Field(Back end)
			     field_permission.fillDataToCustomFieldOption(casper, 'checkbox', 'reqfield', '<b>my name is khan</b>','1','1','','','','','ra','rb','rc','2','','', function(err) {
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
							     //Open Front-End URL And Get Title
							     casper.thenOpen(config.url, function sucess() {
								    casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                                 this.test.assertExists('a[href="/register/register"]');
		                                 this.click('a[href="/register/register"]');
									     casper.waitForSelector('form[name="PostTopic"]', function sucess () {
                                            casper.test.assertExists('form[name="PostTopic"]');										
				                             //Method For verifyMessage										
				                            field_permission.verifyMessage(casper,function(err) { 											
				                                     if(!err){
                                                         casper.echo('....................verifyMessagecode excute sucessful.............');
                                                   }
                                            });      
						                },function fail(){this.echo("Member registration form is not found",'ERROR');});
								    },function fail(){this.echo("Registration link  not found",'ERROR');});
				                });
				            } 
				        });
				    }   	
				});	
            }
        			 
		});     
    });
         
		
	//Verify 7:"Verify by add a "check boxes" fields for registration page which is searchable"
	casper.thenOpen(config.backEndUrl,function(){
		this.echo('**************************Case 7***************************', 'INFO');
		this.echo('"Verify by add a ""check boxes"" fields for registration page which is searchable"', 'INFO');
		//Open Back-End URL And Get Title
	     field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)
				field_permission.fillDataToCustomFieldOption(casper, 'checkbox', 'searchablefield', '<b>my name is khan</b>','1','','1','','','','sa','sb','sc','2','','', function(err) {
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
							     //Open Front-End URL And Get Title
							     casper.thenOpen(config.url, function sucess() {
								     casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                                 this.test.assertExists('a[href="/register/register"]');
		                                 this.click('a[href="/register/register"]');
									     //Method For Verify Data In Member Registration Form(Front end)
				                          field_permission.verifyDataToRegistrationForm(casper,'searchablefield' ,   function(err) {
					                         if(!err){
				                                  casper.echo('....................frontend code excute sucessful.............');
				                            } 
					                    });
								    },function fail(){this.echo("Member registration form is not found",'ERROR');});
				                });
				            } 
				        });
				    }   	
				});	
            } 
		});	        
    });
         
		 
	//Verify 8: "Verify by add a "check boxes" fields for registration page which is Private"
	casper.thenOpen(config.backEndUrl,function(){
		 this.echo('**************************Case 8 **************************', 'INFO');
	     this.echo('"Verify by add a ""check boxes"" fields for registration page which is Private"', 'INFO');
		 //Open Back-End URL And Get Title
	      field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)       
			 field_permission.fillDataToCustomFieldOption(casper, 'checkbox', 'privatecheak', '<b>my name is khan</b>','1','','','1','','','pa','pb','pc','2','','', function(err) {			
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
					    		 //Open Front-End URL And Get Title
							     casper.thenOpen(config.url, function sucess() {
								     casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                                 this.test.assertExists('a[href="/register/register"]');
		                                 this.click('a[href="/register/register"]');
									     //Method For Verify Data In Member Registration Form(Front end)
				                         field_permission.verifyDataToRegistrationForm(casper,'privatecheak' ,   function(err) {
					                          if(!err){
				                                 casper.echo('....................frontend code excute sucessful.............');
				                            } 
					                    });
								    },function fail(){this.echo("Member registration form is not found",'ERROR');});
				                });
				            } 
				        });
				    }   	
				});	
            }			 
		});
    });
         
		 
	//Verify 9: "Verify by add a "check boxes" fields for registration page which is Editable by User"
	casper.thenOpen(config.backEndUrl,function(){
		 this.echo('**************************Case 9***************************', 'INFO');
		 this.echo('"Verify by add a ""check boxes"" fields for registration page which is Editable by User', 'INFO');
		  //Open Back-End URL And Get Title
          field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)
			    field_permission.fillDataToCustomFieldOption(casper, 'checkbox', 'editablefield', '<b>my name is khan</b>','1','','','','1','','ea','eb','ec','2','','',function(err) {				
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
							 //Open Front-End URL And Get Title
							 casper.thenOpen(config.url, function sucess() {
								casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                             this.test.assertExists('a[href="/register/register"]');
		                             this.click('a[href="/register/register"]');
									 //Method For Verify Data In Member Registration Form(Front end)
				                     field_permission.verifyDataToRegistrationForm(casper,'editablefield' ,   function(err) {
					                     if(!err){
				                           casper.echo('....................frontend code excute sucessful.............');
				                        } 
					                });
									
								},function fail(){this.echo("Member registration form is not found",'ERROR');});
				            });
				            } 
				        });
				    }   	
				});	
            }
        			 
		 });
    });
         
		          
	 //Verify 10: "Verify by add a "check boxes" fields for registration page which is Show on Members List"
	casper.thenOpen(config.backEndUrl,function(){
	    this.echo('**************************Case 10***************************', 'INFO');
	    this.echo('Verify by add a ""check boxes"" fields for registration page which is Show on Members List"', 'INFO');
		//Open Back-End URL And Get Title
	      field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)
			    field_permission.fillDataToCustomFieldOption(casper, 'select_single', 'memberfield', '<b>my name is khan</b>','1','','','','','1','ma','mb','mc','2','','', function(err) {
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
							 //Open Front-End URL And Get Title
							 casper.thenOpen(config.url, function sucess() {
								casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                             this.test.assertExists('a[href="/register/register"]');
		                             this.click('a[href="/register/register"]');
									 //Method For Verify Data In Member Registration Form(Front end)
				                     field_permission.verifyDataToRegistrationForm(casper,'memberfield' ,   function(err) {
					                     if(!err){
				                           casper.echo('....................frontend code excute sucessful.............');
				                        } 
					                });
									
								},function fail(){this.echo("Member registration form is not found",'ERROR');});
				            });
				            } 
				        });
				    }   	
				});	
            }		 
		});	         
    });
			
			
    //Verify 11: verify with delete multiple custom profile field
	casper.thenOpen(config.backEndUrl,function(){
		this.echo('Delete module***************************', 'INFO');
		//Delete Field To Forum Front End
	    field_permission.deleteField(casper,function(err) { 
				if(!err){
							  // this.echo('....................field not be deleted ............');
				} 
			});
		  
	});
		
		/*
     ***************************************************************************************************************************************************
	                                   -------------   Multiple selection list  ---------
	****************************************************************************************************************************************************
	  */

		
	 //Verify 1 : Verify by add a "Multiple selection list" fields for registration page
	casper.thenOpen(config.backEndUrl, function() {
	     
		   this.echo('*********************************************************************************************************************', 'INFO');
	  this.echo('--------------------------------------- Multiple selection list ------------------------------------------------------', 'INFO');
	  this.echo('*********************************************************************************************************************', 'INFO');
		
	     this.echo('**************************Case 1***************************', 'INFO');
	     this.echo('Verify by add a "Multiple selection list" fields for registration page*', 'INFO');
	     //Open Back-End URL And Get Title
	     field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)
			    field_permission.fillDataToCustomFieldOption(casper,'select_multiple', 'ved1', '<b>my name is khan</b>','1','1','1','','','1','A','B','C','2','','', function(err) {
					if(!err){
					    //Logout To Forum Back End
                         field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
							 //Open Front-End URL And Get Title
							 casper.thenOpen(config.url, function sucess() {
								casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                             this.test.assertExists('a[href="/register/register"]');
		                             this.click('a[href="/register/register"]');
									 casper.waitForSelector('form[name="PostTopic"]', function sucess () {
										this.test.assertExists('form.form-horizontal');										
										 casper.evaluate(function(){
										  var element =document.querySelectorAll('div.btn-group button.multiselect');
										   element[element.length-1].click();	
										 });
										     casper.test.assertExists('a label.checkbox input[value="A"]');
										     casper.click('a label.checkbox  input[value="A"]');
										     casper.test.assertExists('a label.checkbox  input[value="B"]');
										     casper.click('a label.checkbox  input[value="B"]');
										     casper.test.assertExists('a label.checkbox  input[value="C"]');
										     casper.click('a label.checkbox  input[value="C"]'); 
                                         
									 										
						            },function fail(){this.echo("Member registration form is not found",'ERROR');});
								},function fail(){this.echo("Member registration form is not found",'ERROR');});
				            });
				            } 
				        });
				    }   	
				});	
            }		 
	    });
		
	});
	               
						
	 //Verify 2: Verify by add a "Multiple selection list " fields for registration page without check any check box/uncheck all the check box
	casper.thenOpen(config.backEndUrl,function(){
         this.echo('**************************Case 2***************************', 'INFO');
	     this.echo(' Verify by add a "Multiple selection list " fields for registration page without check any check box/uncheck all the check box', 'INFO');
	    //Open Back-End URL And Get Title
	    field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end) 
		  	     field_permission.fillDataToCustomFieldOption(casper, 'select_multiple', 'displaycheak', '<b>my name is khan</b>','','','','','','','da','db','dc','2','','',  function(err) {
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
							    //Open Front-End URL And Get Title
							    casper.thenOpen(config.url, function sucess() {
								     casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                                this.test.assertExists('a[href="/register/register"]');
		                                this.click('a[href="/register/register"]');
									    casper.waitForSelector('form[name="PostTopic"]', function sucess () {
                                            casper.test.assertExists('form[name="PostTopic"]');										
				                              //Method For verifyMessage										
				                            field_permission.verifyMessage(casper,function(err) { 											
				                                     if(!err){
                                                         casper.echo('....................verifyMessagecode excute sucessful.............');
                                                   }
                                            });    
						                },function fail(){this.echo("Member registration form is not found",'ERROR');});
								    },function fail(){this.echo("Registration link  not found",'ERROR');});
				                });
				            } 
				        });
				    }   	
				});	
            }		 
		});
    });
				
	
			
    //Verify 3: Verify by add a "Multiple selection list" fields for registration page without adding title
	casper.thenOpen(config.backEndUrl,function(){
	this.echo('**************************Case 3 **************************', 'INFO');
	this.echo(' Verify by add a "Multiple selection list" fields for registration page without adding title*', 'INFO');
		//Open Back-End URL And Get Title
         field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)
                 field_permission.fillDataToCustomFieldOption(casper,'select_multiple', '', '<b>my name is khan</b>','1','1','1','','','1','ca','cb','cc','2','The field title is required','', function(err) {
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
				                 casper.echo('....................frontend code excute sucessful.............');
				            } 
				        });
				    }   	
				});	
            }		 
		});		
    });
	
	
			
     //Verify 4: Verify by add a "Multiple selection list " fields for registration page without adding options for check box
	 casper.thenOpen(config.backEndUrl,function(){
	 this.echo('**************************Case 4***************************', 'INFO');
	 this.echo('Verify by add a "Multiple selection list " fields for registration page without adding options for check box*', 'INFO');
         //Open Back-End URL And Get Title
         field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)
                field_permission.fillDataToCustomFieldOption(casper,'select_multiple','alert','my name is khan','1','1','1','','','1','','ab','ac','2','You must specify the field options','', function(err) {
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
				                casper.echo('....................frontend code excute sucessful.............');
				            } 
				        });
				    }   	
				});	
            } 
		}); 			
    });
         
		 
     //Verify 5: "Verify by add a ""Multiple selection list "" fields for registration page make first option  as default"
	 casper.thenOpen(config.backEndUrl,function(){
	this.echo('**************************Case 5***************************', 'INFO');
	this.echo('*Verify by add a ""Multiple selection list "" fields for registration page make first option  as default"*', 'INFO');
	     //Open Back-End URL And Get Title
	     field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
				casper.waitForSelector('a[href="fields?action=new_edit_field&new=1"]', function sucess() {
					this.test.assertExists('a[href="fields?action=new_edit_field&new=1"]');
					this.click('a[href="fields?action=new_edit_field&new=1"]');               
					casper.waitForSelector('form[name="frm_fields"]', function sucess() {
						this.test.assertExists('form[name="frm_fields"]', 'custom profile field Form Found');
						this.test.assertExists('#fieldtype');
						this.click('select#fieldtype');
						this.test.assertExists('option[value="checkbox"] ');
						this.click('option[value="checkbox"]');
						this.test.assertExists('#display_register');
						this.click('#display_register');
						this.test.assertExists('#first_default');
						this.click('#first_default');
						this.test.assertExists('a#addFieldOption ');
						this.click('a#addFieldOption ');
						this.test.assertExists('a#addFieldOption');
						this.click('a#addFieldOption');
						this.fill('form[name="frm_fields"]',{
					   'fieldtype': 'select_multiple',
					   'fieldname': 'optioncheak',
					   'description': '<b>my name is khan</b>',
					   'display_register': '1',
						'first_default':'1'	,
						'limit_selection' : '2',
							'option1':'A',
							'option2':'B',
							'option3':'C'								
						},true);
						casper.waitForSelector('div#feedback', function sucess() {
							var msg = casper.fetchText('div p[align="center"]');
							this.echo("message : "+msg, 'INFO');
							//Logout To Forum Back End
                             field_permission.BackEndLogout(casper,function(err) { 
				                if(!err){
							        //Open Front-End URL And Get Title
							        casper.thenOpen(config.url, function sucess() {
								         casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                                     this.test.assertExists('a[href="/register/register"]');
		                                     this.click('a[href="/register/register"]');
									         casper.waitForSelector('form[name="PostTopic"]', function sucess () {
                                                 casper.test.assertExists('form[name="PostTopic"]');										
				                                   //Method For verifyMessage										
				                            field_permission.verifyMessage(casper,function(err) { 											
				                                     if(!err){
                                                         casper.echo('....................verifyMessagecode excute sucessful.............');
                                                   }
                                            });   
						                    },function fail(){this.echo("Member registration form is not found",'ERROR');});
								        },function fail(){this.echo("Registration link  not found",'ERROR');});
				                    });
				                } 
				            });										 										
						},function fail(){this.echo(" custom profile field message is not generated",'ERROR');});
					},function fail(){this.echo("custom profile field not found",'ERROR');})
				},function fail(){this.echo("Add new field button link found",'ERROR');});
            }		 
		});
    });
	
	
         
	//Verify 6: "Verify by add a ""Multiple selection list"" fields for registration page which is required"
	casper.thenOpen(config.backEndUrl,function(){
	this.echo('**************************Case 6***************************', 'INFO');
	this.echo('*"Verify by add a ""Multiple selection list"" fields for registration page which is required"*', 'INFO');
		//Open Back-End URL And Get Title
         field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			     //Method For Filling Data In Custom Profile Field(Back end)
			     field_permission.fillDataToCustomFieldOption(casper, 'select_multiple', 'reqfield', '<b>my name is khan</b>','1','1','','','','','ra','rb','rc','2','','', function(err) {
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
							     //Open Front-End URL And Get Title
							     casper.thenOpen(config.url, function sucess() {
								    casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                                 this.test.assertExists('a[href="/register/register"]');
		                                 this.click('a[href="/register/register"]');
									     casper.waitForSelector('form[name="PostTopic"]', function sucess () {
                                            casper.test.assertExists('form[name="PostTopic"]');										
				                              //Method For verifyMessage										
				                            field_permission.verifyMessage(casper,function(err) { 											
				                                     if(!err){
                                                         casper.echo('....................verifyMessagecode excute sucessful.............');
                                                   }
                                            });     
						                },function fail(){this.echo("Member registration form is not found",'ERROR');});
								    },function fail(){this.echo("Registration link  not found",'ERROR');});
				                });
				            } 
				        });
				    }   	
				});	
            }		 
		});   
    });
        
		
		
	//Verify 7:"Verify by add a "Multiple selection list"" fields for registration page which is searchable"
	casper.thenOpen(config.backEndUrl,function(){
	this.echo('**************************Case 7***************************', 'INFO');
	this.echo('Verify by add a "Multiple selection list"" fields for registration page which is searchable"*', 'INFO');
		//Open Back-End URL And Get Title
	     field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)
				field_permission.fillDataToCustomFieldOption(casper, 'select_multiple', 'searchablefield', '<b>my name is khan</b>','1','','1','','','','sa','sb','sc','2','','', function(err) {
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
							     //Open Front-End URL And Get Title
							     casper.thenOpen(config.url, function sucess() {
								     casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                                 this.test.assertExists('a[href="/register/register"]');
		                                 this.click('a[href="/register/register"]');
									     //Method For Verify Data In Member Registration Form(Front end)
				                          field_permission.verifyDataToRegistrationForm(casper,'searchablefield' ,   function(err) {
					                         if(!err){
				                                  casper.echo('....................frontend code excute sucessful.............');
				                            } 
					                    });
								    },function fail(){this.echo("Member registration form is not found",'ERROR');});
				                });
				            } 
				        });
				    }   	
				});	
            } 
		});		       
    });
         
		 
		 
	//Verify 8: "Verify by add a "Multiple selection list" fields for registration page which is Private"
	casper.thenOpen(config.backEndUrl,function(){
	this.echo('**************************Case 8 **************************', 'INFO');
	this.echo('Verify by add a "Multiple selection list" fields for registration page which is Private"', 'INFO');
		//Open Back-End URL And Get Title
	     field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)       
		    	field_permission.fillDataToCustomFieldOption(casper, 'select_multiple', 'privatecheak', '<b>my name is khan</b>','1','','','1','','','pa','pb','pc','2','','', function(err) {				
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
					    		 //Open Front-End URL And Get Title
							     casper.thenOpen(config.url, function sucess() {
								     casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                                 this.test.assertExists('a[href="/register/register"]');
		                                 this.click('a[href="/register/register"]');
									     //Method For Verify Data In Member Registration Form(Front end)
				                         field_permission.verifyDataToRegistrationForm(casper,'privatecheak' ,   function(err) {
					                          if(!err){
				                                 casper.echo('....................frontend code excute sucessful.............');
				                            } 
					                    });
								    },function fail(){this.echo("Member registration form is not found",'ERROR');});
				                });
				            } 
				        });
				    }   	
				});	
            }			 
		});	
    });
         
		 
	//Verify 9: "Verify by add a ""Multiple selection list" fields for registration page which is Editable by User"
	casper.thenOpen(config.backEndUrl,function(){
	this.echo('**************************Case 9***************************', 'INFO');
	this.echo('Verify by add a ""Multiple selection list" fields for registration page which is Editable by User"', 'INFO');
		//Open Back-End URL And Get Title
	     field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)
			    field_permission.fillDataToCustomFieldOption(casper, 'select_multiple', 'editablefield', '<b>my name is khan</b>','1','','','','1','','ea','eb','ec','2','','', function(err) {				
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
							     //Open Front-End URL And Get Title
							    casper.thenOpen(config.url, function sucess() {
								    casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                                 this.test.assertExists('a[href="/register/register"]');
		                                 this.click('a[href="/register/register"]');
									      //Method For Verify Data In Member Registration Form(Front end)
				                           field_permission.verifyDataToRegistrationForm(casper,'editablefield' ,   function(err) {
					                           if(!err){
				                                    casper.echo('....................frontend code excute sucessful.............');
				                                } 
					                        });
								    },function fail(){this.echo("Member registration form is not found",'ERROR');});
				                });
				            } 
				        });
				    }   	
				});	
            }
        			 
		 });	
    });
         
		 
		 
		          
	//Verify 10: "Verify by add a ""Multiple selection list"" fields for registration page which is Show on Members List"
	casper.thenOpen(config.backEndUrl,function(){
	this.echo('**************************Case 10***************************', 'INFO');
	this.echo('*Verify by add a ""Multiple selection list"" fields for registration page which is Show on Members List"*', 'INFO');
		//Open Back-End URL And Get Title
	     field_permission.OpenBackEndURL(casper,function(err) { 
		     if(!err){
			    //Method For Filling Data In Custom Profile Field(Back end)	
			    field_permission.fillDataToCustomFieldOption(casper, 'select_multiple', 'memberfield', '<b>my name is khan</b>','1','','','','','1','ma','mb','mc','2','','', function(err) {
					if(!err){
					    //Logout To Forum Back End
                          field_permission.BackEndLogout(casper,function(err) { 
				            if(!err){
							    //Open Front-End URL And Get Title
							    casper.thenOpen(config.url, function sucess() {
								    casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                                 this.test.assertExists('a[href="/register/register"]');
		                                 this.click('a[href="/register/register"]');
									      //Method For Verify Data In Member Registration Form(Front end)
				                           field_permission.verifyDataToRegistrationForm(casper,'memberfield' ,   function(err) {
					                            if(!err){
				                                   casper.echo('....................frontend code excute sucessful.............');
				                                } 
					                        });
								    },function fail(){this.echo("Member registration form is not found",'ERROR');});
				                });
				            } 
				        });
				    }   	
				});	
            }
        			 
		});     
    });
	   
	   
	//Verify 11: verify with delete multiple custom profile field
	casper.thenOpen(config.backEndUrl,function(){
		this.echo('Delete module***************************', 'INFO');
		//Delete Field To Forum Front End
	    field_permission.deleteField(casper,function(err) { 
				if(!err){
							  // this.echo('....................field not be deleted ............');
				} 
			});
		  
	});	
		
		/*
     ***************************************************************************************************************************************************
	                                   -------------   EditField ---------
	****************************************************************************************************************************************************
	  */

	  
	 //Verify 1 : verify by edit content of any custom profile fields
	casper.thenOpen(config.backEndUrl, function() {
	
    this.echo('*********************************************************************************************************************', 'INFO');
	  this.echo('---------------------------------------EditField------------------------------------------------------', 'INFO');
	  this.echo('*********************************************************************************************************************', 'INFO');
	
	this.echo('**************************Case 1***************************', 'INFO');
	this.echo('verify by edit content of any custom profile fields', 'INFO');
	 //Open Back-End URL And Get Title
	 field_permission.OpenBackEndURL(casper,function(err) { 
		 if(!err){
			//Method For Filling Data In Custom Profile Field(Back end)
			field_permission.fillDataToCustomProfileField(casper, 'Short answer', 'edit', '<b>my name is khan</b>','1','','','','','','','',   function(err) {
				if(!err){
					casper.waitForSelector('div#feedback', function sucess() {		
						var res2 = casper.evaluate(function(){
							var element =document.querySelectorAll('tr td a');
							var val = element[element.length-1].href;			
							return val;
						});
						casper.echo("message : "+res2, 'INFO');
						casper.thenOpen(res2,function(){
							casper.waitForSelector('form[name="frm_fields"]', function sucess() {	
								casper.test.assertExists('form[name="frm_fields"]', 'custom profile field Form Found');
                                casper.fill('form[name="frm_fields"]',{
									'fieldtype': 'Short answer',
									'fieldname': 'field',
									'description': '<b>don</b>',
									'display_register': '1'
								 },true);
								casper.waitForSelector('div#feedback', function sucess() {
									var msg = casper.fetchText('div p[align="center"]');
									this.echo("message : "+msg, 'INFO');
									//Logout To Forum Back End
									 field_permission.BackEndLogout(casper,function(err) { 
										 if(!err){
										   //Open Front-End URL And Get Title
											casper.thenOpen(config.url, function sucess() {
												 casper.waitForSelector('a[href="/register/register"]', function sucess() {
													 this.test.assertExists('a[href="/register/register"]');
													 this.click('a[href="/register/register"]');
													 casper.waitForSelector('form[name="PostTopic"]', function sucess () {
														casper.test.assertExists('form[name="PostTopic"]');										
														  //Method For verifyMessage										
				                            field_permission.verifyMessage(casper,function(err) { 											
				                                     if(!err){
                                                         casper.echo('....................verifyMessagecode excute sucessful.............');
                                                   }
                                            });    
													},function fail(){this.echo("Member registration form is not found",'ERROR');});
												},function fail(){this.echo("Member registration form is not found",'ERROR');});
											});
										} 
									});				
			                    },function fail(){this.echo(" custom profile field message is not generated",'ERROR');});
		                    },function fail(){this.echo("custom profile field not found",'ERROR');});	
						});   
			        },function fail(){this.echo(" custom profile field message is not generated",'ERROR');});
				}
	        });					
        }		 
	});   	
    });
     
		/*
     ***************************************************************************************************************************************************
	                                   -------------   DeleteField---------
	****************************************************************************************************************************************************
	  */
	 
    //Verify 1 : verify with delete any one custom profile field
	casper.thenOpen(config.backEndUrl, function() {
	
    this.echo('*********************************************************************************************************************', 'INFO');
	  this.echo('---------------------------------------DeleteField------------------------------------------------------', 'INFO');
	  this.echo('*********************************************************************************************************************', 'INFO');
	
	
	this.echo('**************************Case 1***************************', 'INFO');
	this.echo('verify with delete any one custom profile field', 'INFO');
    //Open Back-End URL And Get Title
	field_permission.OpenBackEndURL(casper,function(err) { 
		 if(!err){	
            //Method For Filling Data In Custom Profile Field(Back end)
			field_permission.fillDataToCustomProfileField(casper, 'Short answer', 'edit', '<b>my name is khan</b>','1','','','','','','','',   function(err) {
				if(!err){		                   
			        casper.waitForSelector('div#feedback', function sucess() {													 
						var res2 = casper.evaluate(function(){
							var element =document.querySelectorAll('tr td input');
						    var val = element[element.length-1].type;	
							return val;
						});
						casper.echo("message : "+res2, 'INFO');
						casper.fill('form#custom_fields_table',{
						 'custom_profile': 'res2'
						},true);	
						casper.test.assertExists('button.button');
						casper.click('button.button');
						casper.waitForSelector('div#feedback', function sucess() {
							var msg = casper.fetchText('div p[align="center"]');
							casper.echo("message : "+msg, 'INFO');
							 //Logout To Forum Back End
                             field_permission.BackEndLogout(casper,function(err) { 
								if(!err){
							         //Open Front-End URL And Get Title
							         casper.thenOpen(config.url, function sucess() {
								        casper.waitForSelector('a[href="/register/register"]', function sucess() {
		                                     this.test.assertExists('a[href="/register/register"]');
		                                     this.click('a[href="/register/register"]');
									         casper.waitForSelector('form[name="PostTopic"]', function sucess () {
                                                 casper.test.assertExists('form[name="PostTopic"]');										
				                                 //Method For verifyMessage										
				                            field_permission.verifyMessage(casper,function(err) { 											
				                                     if(!err){
                                                         casper.echo('....................verifyMessagecode excute sucessful.............');
                                                   }
                                            });  
						                    },function fail(){this.echo("Member registration form is not found",'ERROR');});
								        },function fail(){this.echo("Member registration form is not found",'ERROR');});
				                    });
				                }
				            });										
                        },function fail(){this.echo(" custom profile field message is not generated",'ERROR');});
			        },function fail(){this.echo(" custom profile field message is not generated",'ERROR');});	
                }
	        });                        	
        }
    });
	});
		

	//Verify 2: verify with delete multiple custom profile field
	casper.thenOpen(config.backEndUrl,function(){
		this.echo('Delete module***************************', 'INFO');
		//Delete Field To Forum Front End
	    field_permission.deleteField(casper,function(err) { 
				if(!err){
							  // this.echo('....................field not be deleted ............');
				} 
			});
		  
	});		
	
		
		
	
		
	
	   
	   });//start braces
		
		

    };
	var verifyErrorMsg = function(errorMessage, expectedErrorMsg, msgTitle, driver, callback) {
     driver.echo('Actual Error message : '+errorMessage, 'INFO');
     driver.echo('Expected Error message : '+expectedErrorMsg, 'INFO');
     if((errorMessage == expectedErrorMsg) || (errorMessage.indexOf(expectedErrorMsg) > -1)) {
		 driver.echo('Error message is verified when user try to edit with "' +msgTitle+'"', 'INFO');
	     } else {
	    driver.echo("Error Message Is Not Correct", 'ERROR');

	    }

     return callback(null);
    };
/************************************PRIVATE METHODS***********************************/	

field_permission.loginToApp = function(username, password, driver,callback) {
	try{	
		driver.test.assertExists('#td_tab_login');
		forumLogin.loginToApp(username, password, driver, function(){
			driver.echo("User "+username+" logged-in successfully.");
		});
	}catch(err){
		casper.echo("Exception is : "+err);
		forumLogin.logoutFromApp(driver, function(){
			driver.echo('Successfully logout from application', 'INFO');
			forumLogin.loginToApp(username, password, driver, function(){
				driver.echo("User "+username+" logged-in successfully.");
			});
		});
	};
	return callback(null);
};





//Method For Filling Data In Login Form(Front end)
field_permission.fillDataToLoginFront = function( driver,data, callback) {
	driver.fill('form[name="frmLogin"]', {
		'member' : data.username,
		'pw' : data.password,
	}, false);
	driver.test.assertExists('form[name="frmLogin"] button');
	driver.click('form[name="frmLogin"] button');
	return callback();
};

//Logout To Forum Back End
field_permission.BackEndLogout = function(driver, callback) {
	driver.waitForSelector('div#account_sub_menu a:nth-of-type(2)', function sucess() {
	    this.test.assertExists('div#account_sub_menu a:nth-of-type(2)');
	    this.click('div#account_sub_menu a:nth-of-type(2)');
	    this.test.assertExists('div#ddAccount a:nth-of-type(5)');
	    this.click('div#ddAccount a:nth-of-type(5)');
		driver.waitForSelector('div#content_wrapper div.text', function sucess() {
		   var logout = casper.fetchText('div#content_wrapper div.text');
		   this.echo("message : "+logout, 'INFO');
		},function fail(){this.echo(" Logout  message not generated  ", 'ERROR');});
	},function fail(){this.echo(" Logout not successful ",'ERROR');});
	return callback(null);	
};





//Method For Filling Data In Login Form(Back end)
field_permission.fillDataToLoginBack = function( driver,data, callback) {
	driver.fill('form[name="frmLogin"]', {
		'username' : data.uname,
		'password' : data.upass,
	}, false);
	driver.test.assertExists('form[name="frmLogin"] button');
	driver.click('form[name="frmLogin"] button');
	return callback();
};


//Logout To Forum Front End
field_permission.directToLogout = function(casper,callback) {
	try {
		 casper.test.assertExists('ul.nav.pull-right span.caret');
		 casper.click('ul.nav.pull-right span.caret');
		 try {
			 casper.test.assertExists('span.pull-right.user-nav-panel a');
			 casper.click('span.pull-right.user-nav-panel a');
			 casper.waitForSelector('div#uploadAvatar', function success() {
				 var msg = casper.fetchText('div#uploadAvatar span#memberName');
				 casper.echo("message : "+msg, 'INFO');	 
				 try {
					 casper.test.assertExists('ul.nav.pull-right span.caret');
					 casper.click('ul.nav.pull-right span.caret');
					 try {
						 casper.test.assertExists('#logout');
						 casper.click('#logout');
						 casper.waitForSelector('a#td_tab_login', function success() {
							 }, function fail() {});
						 }catch(e) {
							 casper.test.assertDoesntExist('#logout');
							}
					}catch(e) {
						 casper.test.assertDoesntExist('ul.nav.pull-right span.caret');
						 var msg = casper.fetchText('div.alert.alert-danger.text-center');
						 casper.echo("message : "+msg, 'INFO');
						} 
				},function fail(){this.echo("user profile not found ",'ERROR');}); 
			}catch(e) {
					 casper.test.assertDoesntExist('span.pull-right.user-nav-panel a');
				}
		}catch(e) {
			 casper.test.assertDoesntExist('ul.nav.pull-right span.caret');
			 var msg = casper.fetchText('div.alert.alert-danger.text-center');
			 casper.echo("message : "+msg, 'INFO');
		} 
	return callback(null);
};


//Delete Field To Forum Front End
field_permission.deleteField = function(casper, callback) {
	
	    
		   //Open Back-End URL And Get Title
	     field_permission.OpenBackEndURL(casper,function(err) { 
		    if(!err){
				casper.waitForSelector('form#custom_fields_table', function sucess() {
					this.test.assertExists('input[name="allbox"]');
					this.click('input[name="allbox"]');               
					this.test.assertExists('button.button');
					this.click('button.button');
					casper.waitForSelector('div#feedback', function sucess() {
						var msg = casper.fetchText('div p[align="center"]');
						this.echo("message : "+msg, 'INFO');
						//Logout To Forum Back End
					    field_permission.BackEndLogout(casper,function(err) { 
					        if(!err){
							}
							 
				        });	
				    },function fail(){this.echo(" custom profile field message is not generated",'ERROR');});
	            },function fail(){this.echo("Add new field button link found",'ERROR');}); 
		    }               	
		}); 
	

	return callback(null);	
};


//Method For Filling Data In Custom Profile Field(Back end)
field_permission.fillDataToCustomProfileField = function(casper, fieldtype, fieldname, description, display_register, fieldmandatory,searchable,privae,editable_user,show_members_list,option,alert ,callback) {
	 casper.waitForSelector('a[href="fields?action=new_edit_field&new=1"]', function sucess() {
		 this.test.assertExists('a[href="fields?action=new_edit_field&new=1"]');
		 this.click('a[href="fields?action=new_edit_field&new=1"]');    
		casper.waitForSelector('form[name="frm_fields"]', function sucess() {
			this.test.assertExists('form[name="frm_fields"]', 'custom profile field Form Found');
			this.fill('form[name="frm_fields"]',{
				'fieldtype': fieldtype,
				'fieldname': fieldname,
				'description': '<b>my name is khan</b>',
				'display_register': display_register,
				'fieldmandatory':  fieldmandatory,
				'searchable' : searchable,
				'private' : privae	,
				'editable_user' :editable_user,
				'show_members_list' : show_members_list,
				'option1':option
			  },true);
			try{	
			    casper.test.assertExists('div.jQAlertDlg.ui-dialog-content.ui-widget-content');
				errorMessage = casper.fetchText('div.jQAlertDlg.ui-dialog-content.ui-widget-content');
				errorMessage = errorMessage.trim();
				if(errorMessage && errorMessage!= '')
				verifyErrorMsg(errorMessage, 'Please correct the following:', alert , casper, function() {});
			}catch(ee){
			   casper.test.assertDoesntExist('div.jQAlertDlg.ui-dialog-content.ui-widget-content');
			  }
			casper.waitForSelector('div#feedback', function sucess() {
			     var msg = casper.fetchText('div p[align="center"]');
			     this.echo("message : "+msg, 'INFO');	   										
			},function fail(){this.echo(" custom profile field message is not generated",'ERROR');});
		},function fail(){this.echo("custom profile field not found",'ERROR');});
	},function fail(){this.echo("Add new field button link found",'ERROR');});	
	return callback(null);		
}

//Method For Verify Data In Member Registration Form(Front end)
field_permission.verifyDataToRegistrationForm = function(casper, fieldtype ,callback) {
	 casper.waitForSelector('form[name="PostTopic"]', function sucess () {								
		this.test.assertExists('form[name="PostTopic"]');										
		 //field verification											
		field_permission.verifyMessage(casper,function(err) { 											
				 if(!err){
				
				
        //Method For Filling Data In Login Form(Front end)		
		field_permission.fillDataToLoginFront(casper,loginData.ValidUser, function() {		
	        casper.waitForSelector('div.panel.panel-default', function sucess() {
			    this.test.assertExists('button#searchContent');
			    this.click('button#searchContent span');
			     casper.waitForSelector(' a#advancedSearch', function sucess() {
				     this.test.assertExists('a#advancedSearch');
				     this.click('a#advancedSearch span');
				     casper.waitForSelector('a#anchor_tab_member_search', function sucess() {
					    this.test.assertExists('#anchor_tab_member_search');
					     this.click('a#anchor_tab_member_search');
					     casper.waitForSelector('.form-horizontal', function sucess() {
					         this.test.assertExists('#search-par div.form-group label');
					          var res2 = casper.evaluate(function(){
						      var element =document.querySelectorAll('#search-par div.form-group label');
						      var val = element[element.length-5];
						      var val2=val.innerHTML;
							  return val2;
						      });
					         this.echo( 'message :'   +res2, 'INFO');
					         //Logout To Forum Front End
						    field_permission.directToLogout(casper,  function(err) {
							if(err){}	
									});							
					},function fail(){this.echo("form not exist ",'ERROR');});
				},function fail(){this.echo("Member link is not working ",'ERROR');});
			},function fail(){this.echo("Advance button not working",'ERROR');});												
		},function fail(){});		        						  
        });
			}
			});
	},function fail(){this.echo("Member registration form is not found",'ERROR');});
	return callback(null);		
}



//Method For Filling Data In Custom Profile Field (Back end if add option)
field_permission.fillDataToCustomFieldOption = function(casper, fieldtype, fieldname, description, display_register, fieldmandatory,searchable,privae,editable_user,show_members_list,option,option2,option3,limit_selection,first_default,alert ,callback) {
	      casper.waitForSelector('a[href="fields?action=new_edit_field&new=1"]', function sucess() {
		 this.test.assertExists('a[href="fields?action=new_edit_field&new=1"]');
		 this.click('a[href="fields?action=new_edit_field&new=1"]'); 
		casper.waitForSelector('form[name="frm_fields"]', function sucess() {
			
			this.test.assertExists('form[name="frm_fields"]', 'custom profile field Form Found');
			this.test.assertExists('a#addFieldOption');
					this.click('a#addFieldOption');
					this.test.assertExists('a#addFieldOption');
					this.click('a#addFieldOption');
			this.fill('form[name="frm_fields"]',{
				'fieldtype': fieldtype,
				'fieldname': fieldname,
				'description': '<b>my name is khan</b>',
				'display_register': display_register,
				'fieldmandatory':  fieldmandatory,
				'searchable' : searchable,
				 'private' : privae	,
				 'editable_user' :editable_user,
				 'show_members_list' : show_members_list,
				 'option1':option,
				 'option2':option2,
				'option3':option3,
				'limit_selection' : limit_selection,
				'first_default':first_default	
			  },true);
			try{
					
				errorMessage = casper.fetchText('div.jQAlertDlg.ui-dialog-content.ui-widget-content');
				errorMessage = errorMessage.trim();
				if(errorMessage && errorMessage!= '')
				verifyErrorMsg(errorMessage, 'Please correct the following:', alert , casper, function() {});
			}catch(ee){
			 casper.test.assertDoesntExist('div.jQAlertDlg.ui-dialog-content.ui-widget-content');
			}
				
			casper.waitForSelector('div#feedback', function sucess() {
			   var msg = casper.fetchText('div p[align="center"]');
			   this.echo("message : "+msg, 'INFO');
					   
														
			},function fail(){this.echo(" custom profile field message is not generated",'ERROR');});
		},function fail(){this.echo("custom profile field not found",'ERROR');})
		},function fail(){this.echo("Add new field button link found",'ERROR');});	
	return callback(null);		
}

//Open Back-End URL And Get Title	
field_permission.OpenBackEndURL  = function(casper,callback) {
	    casper.waitForSelector('form[name="frmLogin"]', function success() {
		//Method For Filling Data In Login Form(Back end)
		field_permission.fillDataToLoginBack(casper,config.backendCred, function() {
			 casper.echo('Proccessing to login on forum back end....', 'INFO');
		     //Clicking On 'Default Options' Tab Under Users 
		    casper.waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function sucess() {
			    this.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					 this.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					 this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					 this.test.assertExists('a[href="/tool/members/mb/fields"]');
					 this.click('a[href="/tool/members/mb/fields"]'); 

		    	 
			   
	        },function fail(){this.echo("Add new field button link found",'ERROR');});				
	    });
	},function fail(){this.echo('Url can not be loaded ', 'ERROR');});
return callback(null);		
};

//Open Front-End verifyMessage And Get Title	
field_permission.verifyMessage  = function(casper,callback) {
	            try{			
                     casper.test.assertExists('div.form-group span.helper');	
						   try{									 
							 var res = casper.evaluate(function(){
								  var element =document.querySelectorAll('span.helper');
								  var val = element[element.length-1];
								  var val2= val.innerHTML;
								 return val2;	
							});	
							casper.echo('message :'  + res, 'INFO'); 
							}
							catch(e){
							casper.echo('module deleted', 'INFO');
							}
							
						}
							catch(ee){
							 casper.test.assertDoesntExist('div.form-group span.helper');
								casper.echo('module deleted', 'INFO'); 
							}	
							
return callback(null);		
};
