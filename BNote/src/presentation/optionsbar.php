<div id="optionsbar">
	<span id="moduleTitle"><?php
	echo Lang::txt("mod_" . $GLOBALS["system_data"]->getModuleTitle()); 
	?></span>
	<div id="optionsContainer">
	<?php 
	$GLOBALS["mainController"]->getView()->showOptions();
	?>
	</div>
</div>