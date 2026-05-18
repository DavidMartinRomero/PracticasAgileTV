package com.agiletv.mediacms.service;

import com.agiletv.mediacms.model.Video;
import com.agiletv.mediacms.repository.VideoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@Service
public class VideoService {

    private final VideoRepository repository;

    public VideoService(VideoRepository repository){
        this.repository = repository;
    }

    public List<Video> findAll(){
        return repository.findAll();
    }

    public Video findById(Long id){
        return repository.findById(id).orElseThrow(() ->
        new ResponseStatusException(HttpStatus.NOT_FOUND, "Video not found: " + id));
    }

    public Video save(Video video){
        return repository.save(video);
    }

    public Video update(Long id, Video incoming){
        Video existing = findById(id);
        existing.setTitle(incoming.getTitle());
        existing.setDuration(incoming.getDuration());
        existing.setFormat(incoming.getFormat());
        existing.setDrm(incoming.getDrm());
        return repository.save(existing);
    }

    public void delete(Long id){
        if (!repository.existsById(id)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Video not found: " + id);
        }
        repository.deleteById(id);
    }
}
