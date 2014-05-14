// put namspace
var QuiltApp = window.QuiltApp || {};

// create a new application view
QuiltApp.QuiltAppView = Backbone.View.extend({
		// operate inside of the element 
		el:$('#quilt-app'),
		// set up event handler
		events:{
			'click #create-tile': 'create_tile'
		},

		initialize: function(){
			// reference to quilt list
			this.$tile_list = $('#tile-list');

			// get a reference to a form element
			this.$form = $('#tile-form');
			this.$source = $('#source');
			this.$caption = $('#caption');
			this.$featured = $('#featured');
			this.$order = $('#order');

			// get reference to stats elements
			this.$count_featured = $('#count-featured');
			this.$count_remaining = $('#count-remaining');

			// make this application view listen for quilts
			// added to our collection
			this.listenTo(QuiltApp.Quilts,'add', this.add_quilt);
			
			// remove from our collection
			this.listenTo(QuiltApp.Quilts, 'remove', this.remove_quilt);
			// listen to anychange of collection
			// and run the 'quilt_stats' function
			this.listenTo(QuiltApp.Quilts, 'all', this.quilt_stats);

			// check the limit to 6
			this.listenTo(QuiltApp.Quilts, 'add remove', this.check_limit);

			// get all exsiting quilt_list and save in localStorage
			QuiltApp.Quilts.fetch();

		},

		// update the featured and remaining stats
		// at the top of quilt_list
		quilt_stats: function(){
			var total = QuiltApp.Quilts.length;
			var featured = QuiltApp.Quilts.feature().length;
			var remaining = 6 - total;

			this.$count_featured.text(featured);
			// limit 6 tiles will be added
			this.$count_remaining.text(remaining);
			
		},

		check_limit:function(){
			var total = QuiltApp.Quilts.length;
			// var featured = QuiltApp.Quilts.feature().length;
			var remaining = 6 - total;
			// check if you hit the limit. it will slide up the form. If not slide down
			if(remaining == 0){
				this.$form.slideUp();
				return;
			}else{
				this.$form.slideDown();
				return;
			}

		},

		add_quilt:function(quilt){
			// create a new view for the given quilt instance
			var view = new QuiltApp.QuiltView({model : quilt});
			//append in tile_list
			this.$tile_list.append(view.render().el);
			
		},

		create_tile : function(e) {
			e.preventDefault();

			// check limits
			var remaining = 6 - QuiltApp.Quilts.length;
			if(remaining == 0) {
				alert("No moar");
				return;
			}

			var quilt_values = {
				source: this.$source.val(),
				caption: this.$caption.val(),
				featured: this.$featured.is(':checked'),
				order: this.$order.val()
			};

			QuiltApp.Quilts.create(quilt_values);

			console.log(QuiltApp.Quilts);

			// reset the form
			this.$form[0].reset();
		}

});

window.QuiltAppView = new QuiltApp.QuiltAppView();