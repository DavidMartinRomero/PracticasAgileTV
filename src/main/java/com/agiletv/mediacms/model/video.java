package com.agiletv.mediacms.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "video")
public class video {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title must not be blank.")
    private String title;

    @Positive(message = "Duration must be greater than cero.")
    private int duration;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Format must be DASH, HLS or SMOOTHSTREAMING.")
    private String format;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "DRM must be WIDEVINE, PLAYREADY or FAIRPLAY.")
    private String drm;

    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist(){
        this.createdAt = LocalDateTime.now();
    }

    // Getters & Setters

    public Long getId()                                 {return id;}
    public void setId(Long id)                          {this.id = id;}
    public String getTitle()                            {return title;}
    public void setTitle(String title)                  {this.title = title;}
    public int getDuration()                            {return duration;}
    public void setDuration(int duration)               {this.duration = duration;}
    public String getFormat()                           {return format;}
    public void setFormat(String format)                {this.format = format;}
    public String getDrm()                              {return drm;}
    public void setDrm(String drm)                      {this.drm = drm;}
    public LocalDateTime getCreatedAt()                 {return createdAt;}
    public void setCreatedAt(LocalDateTime createdAt)   {this.createdAt = createdAt;}
}
