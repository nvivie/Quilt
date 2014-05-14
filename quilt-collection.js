// put namspace
var QuiltApp = window.QuiltApp || {};
// create a collection
QuiltApp.QuiltCollection = Backbone.Collection.extend({
	// tell the collection what model to use
	// and specify local storage after the comma
	model: QuiltApp.QuiltModel,

	localStorage: new Backbone.LocalStorage('quilt-app'),

	// function to return an array containing only 
	feature:function(){
		return this.filter(function(quilts){
			// if the quilt is complet, add it to 
			// the return array
			return quilts.get('feature');
		});
	},



});

//create instance of our collection
// this collection inside of app-view.js
QuiltApp.Quilts = new QuiltApp.QuiltCollection();