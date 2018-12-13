'use strict.';
var forumListingPageMethod =module.exports = {};

//-------------------------------------create category heading ------------------------------------------------------
forumListingPageMethod.createCategoryHeading= function(data){

        casper.then(function(){
        	var heading = casper.evaluate(function(){
                	var x1 = document.querySelector('div#forum-manager-heading-actions a:nth-child(2)');
                        x1.click();
                        var x2 = document.querySelector('div#sortable ul li:nth-last-child(1)').getAttribute('class');
                        return x2;
               });
               utils.info('categoriesName :'+heading);
               this.test.assertExists('li.sortableLi.category_row_bg_color.active');
               this.sendKeys('li.sortableLi.category_row_bg_color.active div.select', data);
               this.test.assertSelectorHasText('a[href="/tool/members/mb/forums?action=edit_cat"]', 'New Heading');
               this.click('div#forum-manager-heading-actions a:nth-child(2)');
       }).waitForText(data);
};

//----------------------------------method to delete category heading from backend settings-----------------------------
forumListingPageMethod.deleteCategories= function(data){

        casper.then(function(){
        	var deleteheading = casper.evaluate(function(data){
                	var x1 = document.querySelectorAll('div#sortable ul li').length;
                        for(var i=1; i<=x1; i++){
                        	var x2 = document.querySelector('div#sortable ul li:nth-child('+i+') div:nth-child(1) a');
                                if (x2.innerText == data){
                                	var x3 = document.querySelector('div#sortable ul li:nth-child('+i+')').getAttribute('id');
                                        var x4 = document.querySelector('div#forumAction'+x3+' a:nth-child(2)');
                                        x4.click();
                                        return x4;
                               }
                       }
              }, data);

       }).then(function(){
       		utils.info('heading category deleted successfully');
       });
};

//-------------------------edit category heading from backend settings-------------------------------------------------
//4.Method for Backend Setting(create CategoriesHeading)
forumListingPageMethod.editCategoryHeading= function(data, value){

        casper.then(function(){
        	var editCategorie = casper.evaluate(function(data){
                	var x1 = document.querySelectorAll('div#sortable ul li').length;
                        for(var i=1; i<=x1; i++){
                        	var x2 = document.querySelector('div#sortable ul li:nth-child('+i+') div:nth-child(1) a');
                                if (x2.innerText == data) {
                                	var x3 = document.querySelector('div#sortable ul li:nth-child('+i+') a:nth-child(3)').getAttribute('data-forumid');
                                        var x4 = document.querySelector('div#forumAction'+x3+' a:nth-child(1)');
                                        x4.click();
                                        return x3;
                                }
                        }
                },data);
                utils.info(editCategorie);
                casper.sendKeys('li.sortableLi.category_row_bg_color.parent div a ', value);
                casper.click('div#forum-manager-heading-actions a:nth-child(2)');
        }).waitForText('headingCategoriesEdit');
};

//-----------------------------delete sub-category under the category-----------------------------
forumListingPageMethod.deleteSubCategory=function(data, value){
        casper.then(function(){
                var deletesubcategory = casper.evaluate(function(data, value){
	                var size = document.querySelectorAll('div#sortable ul li').length;
			for(var i=1; i<=size; i++){
			        var x1 = document.querySelector('div#sortable ul li:nth-child('+i+') div:nth-child(1) a');
			        if (x1.innerText == value){
				        x1.click();
					var x2 = document.querySelectorAll('div#sortable ul li:nth-child('+i+') ul li').length;
					for(var j=1; j<=x2; i++){
						var x3 = document.querySelector('div#sortable ul li:nth-child('+i+') ul li:nth-child('+j+') div a');
                                                if (x3.innerText == data){
							var x4 = document.querySelector('div#sortable ul li:nth-child('+i+') ul li:nth-child('+j+')').getAttribute('id');
							var x5 = document.querySelector('div#forumAction'+x4+' a:nth-child(2)');
						        x5.click();
							return x4;
						}
					}
				}
			}
	        },data, value);
	        utils.info(deletesubcategory);
        }).wait('1000', function(err) {
        });
};

//link the subcategory
forumListingPageMethod.getlinkSubCategory=function(value, data){
        casper.then(function(){
                var linksubcategory = casper.evaluate(function(value, data){
	                var size = document.querySelectorAll('div#sortable ul li').length;
			for(var i=1; i<=size; i++){
			        var x1 = document.querySelector('div#sortable ul li:nth-child('+i+') div:nth-child(1) a');
			        if (x1.innerText == value){
				        x1.click();
					var x2 = document.querySelectorAll('div#sortable ul li:nth-child('+i+') ul li').length;
					for(var j=1; j<=x2; i++){
						var x3 = document.querySelector('div#sortable ul li:nth-child('+i+') ul li:nth-child('+j+') div a');
                                                if (x3.innerText == data){
							var x4 = document.querySelector('div#sortable ul li:nth-child('+i+') ul li:nth-child('+j+')').getAttribute('id');
							return x4;
                                                }
					}
				}
			}
	        },value, data);
                this.click('li[id="'+linksubcategory+'"] div a:nth-child(3) span');
        });
};

//edit-SubCategory--------------------------
forumListingPageMethod.editSubCategory=function(data, value){
        casper.then(function(){
                var editsubcategory = casper.evaluate(function(data, value){
                        var size = document.querySelectorAll('div#sortable ul li').length;
                        for(var i=1; i<=size; i++){
                                var x1 = document.querySelector('div#sortable ul li:nth-child('+i+') div:nth-child(1) a');
                                if (x1.innerText == value){
                                        x1.click();
                                        var x2 = document.querySelectorAll('div#sortable ul li:nth-child('+i+') ul li').length;
                                        for(var j=1; j<=x2; i++){
                                                var x3 = document.querySelector('div#sortable ul li:nth-child('+i+') ul li:nth-child('+j+') div a');
                                                if (x3.innerText == data){
                                                        var x4 = document.querySelector('div#sortable ul li:nth-child('+i+') ul li:nth-child('+j+')').getAttribute('id');
                                                        var x5 = document.querySelector('div#forumAction'+x4+' a:nth-child(1)');
                                                        x5.click();
                                                        return x4;
                                                }
                                        }
                                }
                        }
                },data, value);
                utils.info(editsubcategory);
        }).wait('1000', function(err) {
        });
};

//----------------------------edit category from backend settings----------------------------------
forumListingPageMethod.editCategory= function(title){

        casper.then(function(){
                var editCategory = casper.evaluate(function(title){
        		var x1 = document.querySelectorAll('div#sortable ul li').length;
        	        for(var i=1; i<=x1; i++) {
        			var x2 = document.querySelector('div#sortable ul li:nth-child('+i+') div:nth-child(1) a:nth-child(2)');
        			if (x2.innerText == title) {
        				var x3 = document.querySelector('div#sortable ul li:nth-child('+i+')').getAttribute('id');
        				var x4 = document.querySelector('div#forumAction'+x3+' a:nth-child(1)');
        				x4.click();
        				return x3;
        			}
        		}
        	},title);
                utils.info('value of edit-category is'+editCategory);
        });
};
