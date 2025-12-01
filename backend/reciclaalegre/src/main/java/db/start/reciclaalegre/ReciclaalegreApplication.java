package db.start.reciclaalegre;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import db.start.reciclaalegre.model.Usuario;
import db.start.reciclaalegre.model.enums.TipoUsuario;

@SpringBootApplication
public class ReciclaalegreApplication implements CommandLineRunner{

	public static void main(String[] args) {
		SpringApplication.run(ReciclaalegreApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		Usuario usuario1 = new Usuario("cris@gmail.com", "1234", "55996450829", true);
		
		System.out.println("email " + usuario1.getEmail());

		System.out.println("senha " + usuario1.getSenha());
		System.out.println("telefone " + usuario1.getTelefone());

		System.out.println("tipo " + usuario1.getTipoUsuario());


	}

}
