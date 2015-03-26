$(document).ready(function () {
	$('body').on('click', '#create-btn', function () {
		var val = $('#name').val();
		if(val !== ''){
			Avatar.create(val);
			Avatar.build();
		}
	});
});