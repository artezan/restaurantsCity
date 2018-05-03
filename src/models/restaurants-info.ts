export interface RestaurantsInfo {
  /**
   * Unique Id of restaurant
   */
  id: string | number;
  /**
   * Name of restaurant
   */
  name: string;
  /**
   * Contact info. Contains a website, email and phone
   */
  contact: {
    /**
     * Website of the restaurant
     */
    site: string;
    /**
     * Email
     */
    email: string;
    /**
     * Phone number
     */
    phone: string;
  };
  /**
   * Restaurant location info
   */
  address: {
    street: string;
    city: string;
    state: string;
    /**
     * Latitude and longitude
     */
    location: {
      lat: number;
      lng: number;
    };
  };
  /**
   * A number between 0 and 4
   */
  rating: number;
}
