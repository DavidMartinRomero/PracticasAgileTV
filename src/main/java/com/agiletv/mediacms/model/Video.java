package com.agiletv.mediacms.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "video")
public class Video {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title must not be blank.")
    private String title;

    @Positive(message = "Duration must be greater than cero.")
    private int duration;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Format must be DASH, HLS or SMOOTHSTREAMING.")
    private Format format;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "DRM must be WIDEVINE, PLAYREADY or FAIRPLAY.")
    private Drm drm;

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
    public Format getFormat()                           {return format;}
    public void setFormat(Format format)                {this.format = format;}
    public Drm getDrm()                                 {return drm;}
    public void setDrm(Drm drm)                         {this.drm = drm;}
    public LocalDateTime getCreatedAt()                 {return createdAt;}
    public void setCreatedAt(LocalDateTime createdAt)   {this.createdAt = createdAt;}
}
