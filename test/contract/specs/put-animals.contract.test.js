import {provider} from '../config/init-pact';  
import {Matchers} from '@pact-foundation/pact';
import {AnimalController} from '../../../controllers';

describe('Animal Service', () => {     
    describe('When a request to edit one animal is made', () => {         
        beforeAll(async () => {             
            await provider.setup();             
            await provider.addInteraction({     
                uponReceiving: 'a request to edit one animal',     
                state: "has the animal",     
                withRequest: {         
                    method: 'PUT',         
                    path: '/animals/manchas'     
                },     
                willRespondWith: {         
                    status: 200,         
                    body: Matchers.eachLike({         
                        id: Matchers.like(69),
                        name: Matchers.like('manchas'),                 
                        breed: Matchers.like("Toyger"),                 
                        gender: Matchers.like("Male"),                 
                        vaccinated: Matchers.boolean(true)             
                    })     
                } 
                });         
        });          
        test('should return the correct data', async () => {             
            const response = await AnimalController.updateAnimal("manchas");
            expect(response.data).toMatchSnapshot();  
            await provider.verify()       
        });          
        afterAll(() => provider.finalize());     
    }); 
});