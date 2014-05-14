// put namspace
var QuiltApp = window.QuiltApp || {};

QuiltApp.QuiltView = Backbone.View.extend({
	tagName: 'li',
	className : 'tile',
	template: _.template($('#tile-template').html()),

	events: {
		'click .feature': 'feature_tile',
		'click .view': 'view_tile',
		'click .delete': 'delete_tile'
	},

	feature_tile: function(e){
		e.preventDefault();

		this.model.set('feature', true);
		
		this.$el.toggleClass('featured');
		console.log(this.$el);

	},

	view_tile:function(e){
		e.preventDefault();

		this.model.set('view', true);
		this.$el.toggleClass('expanded');
	},

	delete_tile: function(e){
		e.preventDefault();

		if (this.model.get('delete') || confirm ('Are you sure you want to delete?')){
			// remove the modelfrom local storage and from the collection
			
			this.model.destroy();
				// remove tile from html page
			this.$el.slideUp('fast', function(){
				this.remove();
			});
		}
	},

	render: function(){
		this.$el.html(this.template(this.model.toJSON()));

		if(this.model.get('featured')){
			this.$el.addClass('featured');
		}
		return this;
	}
});