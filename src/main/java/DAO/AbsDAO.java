package DAO;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import model.Movie;
import org.bson.Document;

import java.util.ArrayList;
import java.util.List;

public abstract class AbsDAO {

    static MongoDatabase db;

    MongoDatabase getDB() {
        if (db == null) {
            ConnectionString connectionString = new ConnectionString("mongodb+srv://root:root@cluster0.71wmt.mongodb.net/sample_mflix?retryWrites=true&w=majority");
            MongoClientSettings settings = MongoClientSettings.builder()
                    .applyConnectionString(connectionString)
                    .build();
            MongoClient mongoClient = MongoClients.create(settings);
            db = mongoClient.getDatabase("sample_mflix");
            System.out.println("Connect to DB");
        }
        return db;
    }

}