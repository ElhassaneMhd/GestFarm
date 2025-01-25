package baa3.Service;

import baa3.Model.User;
import baa3.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

   public User register(User user){
       return userRepository.save(user);
   }

}
