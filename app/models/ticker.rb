class Ticker
  include Mongoid::Document
  has_many :headlines
  field :sym, type: String
end
