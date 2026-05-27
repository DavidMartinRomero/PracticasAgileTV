package com.agiletv.mediacms.dto;

import java.util.List;

public record ConfigResponse(String clientType, Theme theme, Features features) {

    public record Theme(String primaryColor, String secondaryColor){}

    public record Features(
            boolean downloadEnabled,
            int maxConcurrentsStreams,
            List<String> allowedFormats,
            List<String> allowedDrm
    ) {}
}
