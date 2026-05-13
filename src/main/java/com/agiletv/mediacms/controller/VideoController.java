package com.agiletv.mediacms.controller;

import com.agiletv.mediacms.model.Video;
import com.agiletv.mediacms.service.VideoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/videos")
public class VideoController {

    private final VideoService service;

    public VideoController(VideoService service){
        this.service = service;
    }

    @GetMapping
    public List<Video> getAll(){
        return service.findAll();
    }

    @GetMapping("/{id}")
    public Video getById(@PathVariable Long id){
        return service.findById(id);
    }

    @PostMapping
    public ResponseEntity<Video> create(@Valid @RequestBody Video video){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(video));
    }

    @PutMapping
    public Video update(@PathVariable Long id, @Valid @RequestBody Video video){
        return service.update(id, video);
    }

    @DeleteMapping
    public ResponseEntity<Void> delete(@PathVariable Long id){
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
