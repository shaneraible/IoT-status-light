//
//  ViewController.swift
//  doorbell
//
//  Created by Shane Raible on 8/26/20.
//  Copyright © 2020 Shane Raible. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    //MARK: Properties

    @IBOutlet weak var statusButton: UIButton!
    @IBOutlet weak var lightId: UILabel!
    @IBOutlet weak var statusLabel: UILabel!

    @IBOutlet weak var ringingLabel: UILabel!
    @IBOutlet weak var onLabel: UILabel!
    @IBOutlet weak var powerButton: UIButton!
    @IBOutlet weak var refreshButton: UIButton!
    
    var id = "bedroom"
    var status = ""
    var color = "#fff333"
    var isRinging = false
    var on = false
    
    struct Light: Codable{
        let id: String
        let status: String
        let color: String
        let isRinging: Bool
        let on: Bool
    }
    override func viewDidLoad() {
        ringingLabel.isHidden = true;
        super.viewDidLoad()
        fetchDoorInfo()
        startTimer()
    }
    
    func startTimer(){
        Timer.scheduledTimer(timeInterval: 1, target: self, selector: #selector(self.fetchDoorInfo), userInfo: nil, repeats: true)
    }
    @objc func fetchDoorInfo(){
        getDoorInfo()
        
        if isRinging{
            handleRinging()
        }
        if !isRinging{
            powerButton.isHidden = false
            statusButton.isHidden = false
            refreshButton.isHidden = false
            ringingLabel.isHidden = true
        }
    }
    
    func handleRinging(){
        powerButton.isHidden = true
        statusButton.isHidden = true
        refreshButton.isHidden = true
        
        ringingLabel.isHidden = false
        
    }
    
    @objc func getDoorInfo(){
        var done = false
        if let url = URL(string: "https://shaneraible.azurewebsites.net/api/light/"+id) {
           URLSession.shared.dataTask(with: url) { data, response, error in
              if let data = data {
                  do {
                    let res = try JSONDecoder().decode(Light.self, from: data)
                    self.status = res.status;
                    self.color = res.color;
                    self.isRinging = res.isRinging;
                    self.on = res.on;
                    print(res.status);
                    print(self.isRinging)
                    print(res.status)
                    print(res.on)
                    done=true
                    
                  } catch let error {
                     print(error)
                  }
            }
           }.resume();
        }
        
        repeat {
            RunLoop.current.run(until: Date(timeIntervalSinceNow: 0.1))
        } while !done
        
        if done {updateInfo()}
    }
    
    func updateInfo(){
        lightId.text = self.id;
        statusLabel.text = status;

        if self.on {
            onLabel.text = "On"
            powerButton.setTitle("Turn off", for: .normal)
            powerButton.backgroundColor = UIColor(red: 0.8275, green: 0.2902, blue: 0, alpha: 1.0)
        }else{
            onLabel.text = "Off"
            powerButton.setTitle("Turn on", for: .normal)
            powerButton.backgroundColor = UIColor(red: 0.1725, green: 0.6078, blue: 0, alpha: 1.0)
        }
        if !self.isRinging {
            ringingLabel.text = "Nobody is at the door"
        }else{
            ringingLabel.text = "Somebody is at the door!"
        }
        var bttn = "";
        if self.status == "busy" { bttn = "free"}
        else { bttn = "busy" }
        statusButton.setTitle("Make "+bttn, for: .normal)
        
    }
    
    func toggleStatus(){
        if self.status == "busy" { self.status = "free"}
        else { self.status = "busy" }
        postUpdates()
    }
    
    func togglePower(){
        on = !on
        print(self.on)
        postUpdates()
    }
    
    func postUpdates(){
        var done = false
        let baseURL = URL(string: "https://shaneraible.azurewebsites.net/api/light")!
        let fullURL = baseURL.appendingPathComponent("/"+id)

        var request = URLRequest(url: fullURL)
        request.httpMethod = "PUT"
        request.allHTTPHeaderFields = [
            "Content-Type": "application/json",
        ]
        let jsonDictionary: [String: Any] = [
            "id":id,
            "status":status,
            "isringing":isRinging,
            "color":color,
            "on":on
        ]
        print(jsonDictionary)
        let data = try! JSONSerialization.data(withJSONObject: jsonDictionary, options: .prettyPrinted)
        print()
        URLSession.shared.uploadTask(with: request, from: data) { (responseData, response, error) in
            if let error = error {
                print("Error making PUT request: \(error.localizedDescription)")
                return
            }
            
            if let responseCode = (response as? HTTPURLResponse)?.statusCode, let
                responseData = responseData {
                done = true
                guard responseCode == 204 else {
                    print("Invalid response code: \(responseCode)")
                    return
                }
                
                if let responseJSONData = try? JSONSerialization.jsonObject(with: responseData, options: .allowFragments) {
                    print("Response JSON data = \(responseJSONData)")
                }
            }
        }.resume()
        
        repeat {
            RunLoop.current.run(until: Date(timeIntervalSinceNow: 0.1))
        } while !done
        
        if done { print(done); getDoorInfo() }
    }
    //MARK: Actions
    @IBAction func statusButton(_ sender: UIButton) {
        toggleStatus();
    }
    @IBAction func powerButtonClick(_ sender: UIButton) {
        togglePower();
    }
    @IBAction func refreshButtonClick(_ sender: UIButton) {
        getDoorInfo();
    }
    
}

