// put namspace
var QuiltApp = window.QuiltApp || {};

QuiltApp.QuiltModel = Backbone.Model.extend({
	defaults: {
		source: 'Image URL',
		caption: '',
		featured: false,
		order: 0,
		feature:false
	}
});

