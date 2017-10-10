'use strict.';
$('document').ready(function() {
	$('input#branch').keydown(function (e) {
		if (e.which == 13 || e.keyCode == 13) {
			var branchName = $('#branch').val();
			if(branchName) {
				$('form#branchStats').attr('action', 'branches/'+branchName);
				$( "form#branchStats" ).submit();
			}
		}
	});
	$('input#backstop').keydown(function (e) {
		if (e.which == 13 || e.keyCode == 13) {
			var backstopBranch = $('#backstop').val();
			if(backstopBranch) {
				$('form#backstopStats').attr('action', 'backstop/'+backstopBranch);
				$('form#backstopStats').submit();
			}
		}
	});
	$('a.run_backstop').click(function() {
		var branchName = $(this).attr('id');
		if(branchName) {
			$('form.backstop_form_button').attr('action', 'backstop/'+branchName);
			$('form.backstop_form_button').submit();
		}
	});
});

function goBack() {
	window.history.back();
}
