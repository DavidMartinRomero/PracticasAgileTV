package com.agiletv.mediacms.controller;

import com.agiletv.mediacms.config.AppConfig;
import com.agiletv.mediacms.dto.ConfigResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/config")
public class ConfigController {
    private final AppConfig appConfig;

    public ConfigController(AppConfig appConfig) {
        this.appConfig = appConfig;
    }

    @GetMapping
    public ResponseEntity<ConfigResponse> getConfig(
            @RequestParam(defaultValue = "consumer") String clientType) {
        AppConfig.ClientConfig client = appConfig.getClients().get(clientType.toLowerCase());
        if (clientType == null) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(new ConfigResponse(
                clientType.toUpperCase(),
                new ConfigResponse.Theme(
                        client.getTheme().getPrimaryColor(),
                        client.getTheme().getSecondaryColor()
                        ),
                new ConfigResponse.Features(
                        client.getFeatures().isDownloadEnabled(),
                        client.getFeatures().getMaxConcurrentStreams(),
                        client.getFeatures().getAllowedFormats(),
                        client.getFeatures().getAllowedDrm()
                )
        ));
    }
}
