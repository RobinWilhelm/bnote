<?php 
if(isset($_GET["mod"]) && is_numeric($_GET["mod"])) {
	?>
	<!-- Navigation -->
	<div id="navigation">
	
		<?php
		$modarr = $system_data->getModuleArray();
	
		// render menu
		foreach($modarr as $id => $name) {
	
			// don't show module if user doesn't have permission
			if(!$system_data->loginMode() && !$system_data->userHasPermission($id)) continue;
	
			if($id == $system_data->getModuleId()) {
				// current Module
				$selected = "_selected";
			}
			else $selected = "";
	
			$tecName = strtolower($name);
			$caption = Lang::txt("mod_" . $system_data->getModuleTitle($id));
			?>
			<a class="navi" href="?mod=<?php echo $id; ?>">
				<div class="navi_item<?php echo $selected; ?>">
					<img src="<?php echo $GLOBALS["DIR_ICONS"] . $tecName . ".png"; ?>" alt="<?php echo $tecName?>" height="16px" class="navi_item_icon" />
					<span class="navi_item_caption<?php echo $selected; ?>"><?php echo $caption; ?></span>
				</div>
			</a>
			<?php
		}
	
		?>
	</div>	
	<?php 
}
?>