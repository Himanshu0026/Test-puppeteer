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
			//$('form.backstop_form_button').submit();
		}
	});
	$('a.run_automation').click(function() {
		var branchName = $(this).attr('id');
		if(branchName) {
			//$('form.automation_form_button').attr('action', 'automate/'+branchName);
			//$('form.backstop_form_button').submit();
		}
	});
	$('a.prioritze_job').click(function() {
		var branchName = $(this).attr('id');
		//$('button[type=submit]').not('#'+branchName).prop('disabled',true);
		$("#executeAutomation").show();
		if(branchName) {
			$('form.priortize_form_button').attr('action', 'pendingBranches/'+branchName);
		}
	});
	$('input#automate_Branch').keydown(function (e) {
		if (e.which == 13 || e.keyCode == 13) {
			var automateBranch = $('#automate_Branch').val();
			if(automateBranch) {
				$('form#automate_branch_form').attr('action', 'automate/'+automateBranch);
				$('form#automate_branch_form').submit();
			}
		}
	});
});

function goBack() {
	window.history.back();
}
