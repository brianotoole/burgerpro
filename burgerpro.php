<?php

class Burger_Pro {

	public function __construct() {
    // Hook into the admin menu
		add_action( 'admin_menu', array( $this, 'create_plugin_settings_page' ) );
		// Add Settings and Fields
		add_action( 'admin_init', array( $this, 'setup_sections' ) );
		add_action( 'admin_init', array( $this, 'setup_fields' ) );
		// Include partials
		$this->include_partials();
	}

	public function create_plugin_settings_page() {
    $page_title = 'Burger Pro Nav Settings';
    $menu_title = 'Burger Pro Nav';
    $capability = 'manage_options';
    $slug = 'burgerpro_fields';
    $callback = array( $this, 'plugin_settings_page_content' );
    $icon = 'dashicons-menu-alt3';
		$position = 100;
		// Add as menu page
		//add_menu_page( $page_title, $menu_title, $capability, $slug, $callback, $icon, $position );
		// Add as submenu page (under settings menu)
		add_submenu_page( 'options-general.php', $page_title, $menu_title, $capability, $slug, $callback );
	}
	
	public function plugin_settings_page_content() {?>
		<div class="wrap">
			<h2>Burger Pro Nav Settings</h2><?php
					if ( isset( $_GET['settings-updated'] ) && $_GET['settings-updated'] ){
								$this->admin_notice();
					} ?>
			<form method="POST" action="options.php">
				<?php
					settings_fields( 'burgerpro_fields' );
					do_settings_sections( 'burgerpro_fields' );
					submit_button();
				?>
			</form>
		</div> <?php
	}

	public function admin_notice() { ?>
    <div class="notice notice-success is-dismissible">
      <p>Your settings have been updated.</p>
    </div><?php
  }

	public function setup_sections() {
		add_settings_section( 'burgerpro_section_top', 'Navigation', array( $this, 'section_callback' ), 'burgerpro_fields' );
	}

	public function setup_fields() {
			$fields = array(
				// Nav Toggle Position
				array(
					'uid' => 'burgerpro_nav_position',
					'label' => 'Nav Toggle Position',
					'section' => 'burgerpro_section_top',
					'type' => 'radio',
					'options' => array(
						'left' => 'Left',
						'right' => 'Right',
					),
					'default' => 'left'
				),

				// Nav Toggle Size
				array(
					'uid' => 'burgerpro_nav_size',
					'label' => 'Nav Toggle Size',
					'section' => 'burgerpro_section_top',
					'type' => 'number',
					'placeholder' => '35',
					'helper' => 'px',
					//'supplimental' => '',
				),

			);

			foreach( $fields as $field ){
					add_settings_field( $field['uid'], $field['label'], array( $this, 'field_callback' ), 'burgerpro_fields', $field['section'], $field );
						register_setting( 'burgerpro_fields', $field['uid'] );
			}
		}
	public function field_callback( $arguments ) {
		$value = get_option( $arguments['uid'] );
		if( ! $value ) {
				$value = $arguments['default'];
		}
		switch( $arguments['type'] ){
				case 'text':
				case 'password':
				case 'number':
						printf( '<input name="%1$s" id="%1$s" type="%2$s" placeholder="%3$s" value="%4$s" />', $arguments['uid'], $arguments['type'], $arguments['placeholder'], $value );
						break;
				case 'textarea':
						printf( '<textarea name="%1$s" id="%1$s" placeholder="%2$s" rows="5" cols="50">%3$s</textarea>', $arguments['uid'], $arguments['placeholder'], $value );
						break;
				case 'select':
				case 'multiselect':
						if( ! empty ( $arguments['options'] ) && is_array( $arguments['options'] ) ){
								$attributes = '';
								$options_markup = '';
								foreach( $arguments['options'] as $key => $label ){
										$options_markup .= sprintf( '<option value="%s" %s>%s</option>', $key, selected( $value[ array_search( $key, $value, true ) ], $key, false ), $label );
								}
								if( $arguments['type'] === 'multiselect' ){
										$attributes = ' multiple="multiple" ';
								}
								printf( '<select name="%1$s[]" id="%1$s" %2$s>%3$s</select>', $arguments['uid'], $attributes, $options_markup );
						}
						break;
				case 'radio':
				case 'checkbox':
						if( ! empty ( $arguments['options'] ) && is_array( $arguments['options'] ) ){
								$options_markup = '';
								$iterator = 0;
								foreach( $arguments['options'] as $key => $label ){
										$iterator++;
										$options_markup .= sprintf( '<label for="%1$s_%6$s"><input id="%1$s_%6$s" name="%1$s[]" type="%2$s" value="%3$s" %4$s /> %5$s</label><br/>', $arguments['uid'], $arguments['type'], $key, checked( $value[ array_search( $key, $value, true ) ], $key, false ), $label, $iterator );
								}
								printf( '<fieldset>%s</fieldset>', $options_markup );
						}
						break;
		}
		if( $helper = $arguments['helper'] ){
				printf( '<span class="helper"> %s</span>', $helper );
		}
		if( $supplimental = $arguments['supplimental'] ){
				printf( '<p class="description">%s</p>', $supplimental );
		}
	}


	private function include_partials() {
		require __DIR__ . '/partials/nav.php';
	}

	


}


new Burger_Pro();