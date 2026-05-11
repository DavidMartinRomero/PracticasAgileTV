package com.agiletv.mediacms;

import com.agiletv.mediacms.model.Drm;
import com.agiletv.mediacms.model.Format;
import com.agiletv.mediacms.model.Video;
import java.sql.*;
import java.time.LocalDateTime;

public class Main {
    public static void main(String[] args) {
        try {
            // Construir el objeto
            Video video = new Video();
            video.setTitle("Demo Clip");
            video.setDuration(120);
            video.setFormat(Format.DASH);
            video.setDrm(Drm.WIDEVINE);

            // Abrir conexión y hacer INSERT
            Connection conn = DriverManager.getConnection(
                    "jdbc:mysql://localhost:3306/media_cms", "root", "root");
            PreparedStatement stmt = conn.prepareStatement(
                    "INSERT INTO video (title, duration, format, drm, created_at) VALUES (?, ?, ?, ?, ?)");
            stmt.setString(1, video.getTitle());
            stmt.setInt(2, video.getDuration());
            stmt.setString(3, video.getFormat().name());
            stmt.setString(4, video.getDrm().name());
            stmt.setTimestamp(5, Timestamp.valueOf(LocalDateTime.now()));
            stmt.executeUpdate();
            System.out.println("Vídeo insertado: " + video.getTitle());

            // SELECT para verificar
            PreparedStatement query = conn.prepareStatement(
                    "SELECT id, title, duration, format, drm, created_at FROM video");
            ResultSet rs = query.executeQuery();
            while (rs.next()) {
                System.out.printf("ID=%d | %s | %ds | %s | %s | %s%n",
                        rs.getLong("id"),
                        rs.getString("title"),
                        rs.getInt("duration"),
                        rs.getString("format"),
                        rs.getString("drm"),
                        rs.getTimestamp("created_at"));
            }
            conn.close();
        } catch (Exception e) {
            System.out.println("Problema de conexion:" + e);
        }
    }
}
