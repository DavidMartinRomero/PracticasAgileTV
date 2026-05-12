package com.agiletv.mediacms.repository;

import com.agiletv.mediacms.model.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface VideoRepository extends JpaRepository<Video, Long> {

    // Spring genera el SQL de selección corresponidente.
    List<Video> findByFormat(String format);

    List<Video> findByDrm(String Drm);
}
