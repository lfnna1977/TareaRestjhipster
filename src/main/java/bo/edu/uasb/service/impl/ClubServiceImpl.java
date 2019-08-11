package bo.edu.uasb.service.impl;

import bo.edu.uasb.service.ClubService;
import bo.edu.uasb.domain.Club;
import bo.edu.uasb.repository.ClubRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Club}.
 */
@Service
@Transactional
public class ClubServiceImpl implements ClubService {

    private final Logger log = LoggerFactory.getLogger(ClubServiceImpl.class);

    private final ClubRepository clubRepository;

    public ClubServiceImpl(ClubRepository clubRepository) {
        this.clubRepository = clubRepository;
    }

    /**
     * Save a club.
     *
     * @param club the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Club save(Club club) {
        log.debug("Request to save Club : {}", club);
        return clubRepository.save(club);
    }

    /**
     * Get all the clubs.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Club> findAll() {
        log.debug("Request to get all Clubs");
        return clubRepository.findAll();
    }


    /**
     * Get one club by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Club> findOne(Long id) {
        log.debug("Request to get Club : {}", id);
        return clubRepository.findById(id);
    }

    /**
     * Delete the club by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Club : {}", id);
        clubRepository.deleteById(id);
    }
    
    /**
     * Save a club.
     *
     * @param club the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Club partialSave(Club partialClub) {
        log.debug("Request to save Club : {}", partialClub);
        
        Optional<Club> club = clubRepository.findById(partialClub.getId());

        if (partialClub.getName() == null) {
        	partialClub.setName(club.get().getName());
        }
        if (partialClub.getCity() == null) {
        	partialClub.setCity(club.get().getCity());
        }
        if (partialClub.getTelephone() == null) {
        	partialClub.setTelephone(club.get().getTelephone());
        }
        if (partialClub.getNumSocios() == null) {
        	partialClub.setNumSocios(club.get().getNumSocios());
        }
        
        return clubRepository.save(partialClub);
    }
}
