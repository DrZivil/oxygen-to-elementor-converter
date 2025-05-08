<div class="oxygen-to-bricks-container">
    <header class="otb-header">
        <h1 class="otb-title"><?php echo esc_html($atts['title']); ?></h1>
        <p class="otb-description"><?php echo esc_html($atts['description']); ?></p>
    </header>

    <div class="otb-converter-container">
        <div class="otb-input-container">
            <label for="otb-input"><?php esc_html_e('Paste Oxygen 4.9 JSON', 'oxygen-to-bricks-converter'); ?></label>
            <textarea id="otb-input" placeholder="<?php esc_attr_e('Paste Oxygen 4.9 JSON here...', 'oxygen-to-bricks-converter'); ?>" rows="15"></textarea>
        </div>
        
        <div class="otb-output-container">
            <label for="otb-output"><?php esc_html_e('Bricks JSON Output', 'oxygen-to-bricks-converter'); ?></label>
            <textarea id="otb-output" placeholder="<?php esc_attr_e('Bricks JSON will appear here...', 'oxygen-to-bricks-converter'); ?>" rows="15" readonly></textarea>
            <div class="otb-output-actions">
                <button id="otb-copy" class="otb-btn otb-small"><?php esc_html_e('Copy to Clipboard', 'oxygen-to-bricks-converter'); ?></button>
                <button id="otb-download" class="otb-btn otb-small"><?php esc_html_e('Download JSON', 'oxygen-to-bricks-converter'); ?></button>
            </div>
        </div>
        
        <div class="otb-actions">
            <button id="otb-convert" class="otb-btn otb-primary"><?php esc_html_e('Convert', 'oxygen-to-bricks-converter'); ?></button>
            <button id="otb-load-example" class="otb-btn otb-secondary"><?php esc_html_e('Load Example', 'oxygen-to-bricks-converter'); ?></button>
        </div>
        
        <div id="otb-class-info" class="otb-class-info">
            <h3><?php esc_html_e('Class Conversion', 'oxygen-to-bricks-converter'); ?></h3>
            <div id="otb-class-list" class="otb-class-list">
                <p><?php esc_html_e('Classes will appear here after conversion.', 'oxygen-to-bricks-converter'); ?></p>
            </div>
        </div>
    </div>

    <!-- Hidden div to store example JSON -->
    <div id="otb-example-json" style="display: none;"><?php echo json_encode(array(
        "component" => array(
            "id" => 1,
            "name" => "ct_section",
            "options" => array(
                "ct_content" => "",
                "classes" => array("section-hero"),
                "original" => array(
                    "background-color" => "#f5f5f5",
                    "padding" => "60px"
                )
            ),
            "children" => array(
                array(
                    "id" => 2,
                    "name" => "ct_div_block",
                    "options" => array(
                        "ct_content" => "",
                        "classes" => array("container", "text-center"),
                        "original" => array(
                            "max-width" => "1200px",
                            "margin" => "0 auto"
                        )
                    ),
                    "children" => array(
                        array(
                            "id" => 3,
                            "name" => "ct_headline",
                            "options" => array(
                                "ct_content" => "Hello Bricks!",
                                "classes" => array("hero-title"),
                                "original" => array(
                                    "font-size" => "48px",
                                    "font-weight" => "700",
                                    "color" => "#333"
                                )
                            )
                        ),
                        array(
                            "id" => 4,
                            "name" => "ct_button",
                            "options" => array(
                                "ct_content" => "Get Started",
                                "classes" => array("btn-primary"),
                                "original" => array(
                                    "background-color" => "#007bff",
                                    "color" => "#ffffff",
                                    "padding" => "12px 24px",
                                    "border-radius" => "6px"
                                )
                            )
                        )
                    )
                )
            )
        ),
        "classes" => array(
            "section-hero" => array(
                "original" => array(
                    "background-color" => "#f8f9fa",
                    "padding" => "80px 0"
                )
            ),
            "container" => array(
                "original" => array(
                    "max-width" => "1200px",
                    "margin" => "0 auto",
                    "padding" => "0 20px"
                )
            ),
            "text-center" => array(
                "original" => array(
                    "text-align" => "center"
                )
            ),
            "hero-title" => array(
                "original" => array(
                    "font-size" => "48px",
                    "font-weight" => "700",
                    "color" => "#333333",
                    "margin-bottom" => "20px"
                )
            ),
            "btn-primary" => array(
                "original" => array(
                    "background-color" => "#007bff",
                    "color" => "#ffffff",
                    "padding" => "12px 24px",
                    "border-radius" => "6px",
                    "border" => "none",
                    "font-weight" => "600"
                )
            )
        )
    )); ?></div>
    
    <footer class="otb-footer">
        <p><?php esc_html_e('Oxygen to Bricks Converter', 'oxygen-to-bricks-converter'); ?> &middot; <span id="otb-year"></span></p>
    </footer>
</div>
