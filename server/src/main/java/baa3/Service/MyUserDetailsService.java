package baa3.Service;

import baa3.Model.User;
import baa3.Dto.userDto;
import baa3.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        System.out.println(login);
        User user = userRepository.findByEmail(login);
        if (user == null){
            System.out.println("search by name");
            user = userRepository.findByUsername(login);
        }
        if(user == null){
            System.out.println("User not found");
            throw new UsernameNotFoundException("User not found");
        }
        return new userDto(user);
    }
}
