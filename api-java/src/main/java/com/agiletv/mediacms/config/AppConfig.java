package com.agiletv.mediacms.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import java.util.*;

@Component
@ConfigurationProperties(prefix = "app")
public class AppConfig {
    private Map<String, ClientConfig> clients = new HashMap<>();

    public Map<String, ClientConfig> getClients()              { return clients; }
    public void setClients(Map<String, ClientConfig> clients)  { this.clients = clients; }

    public static class ClientConfig{
        private Theme theme = new Theme();
        private Features features = new Features();

        public Theme getTheme()                                { return theme; }
        public void setTheme(Theme theme)                      { this.theme = theme; }
        public Features getFeatures()                          { return features; }
        public void setFeatures(Features features)             { this.features = features; }
    }

    public static class Theme{
        private String primaryColor;
        private String secondaryColor;

        public String getPrimaryColor()                        { return primaryColor; }
        public void setPrimaryColor(String primaryColor)       { this.primaryColor = primaryColor; }
        public String getSecondaryColor()                      { return secondaryColor; }
        public void setSecondaryColor(String secondaryColor)   { this.secondaryColor = secondaryColor; }
    }

    public static class Features{
        private boolean downloadEnabled;
        private int maxConcurrentStreams;
        private List<String> allowedFormats = new ArrayList<>();
        private List<String> allowedDrm = new ArrayList<>();

        public boolean isDownloadEnabled()                     { return downloadEnabled; }
        public void setDownloadEnabled(boolean v)              { this.downloadEnabled = v; }
        public int getMaxConcurrentStreams()                  { return maxConcurrentStreams; }
        public void setMaxConcurrentStreams(int v)            { this.maxConcurrentStreams = v; }
        public List<String> getAllowedFormats()                { return allowedFormats; }
        public void setAllowedFormats(List<String> v)          { this.allowedFormats = v; }
        public List<String> getAllowedDrm()                    { return allowedDrm; }
        public void setAllowedDrm(List<String> v)              { this.allowedDrm = v; }
    }
}
