class Headline
  include Mongoid::Document
  belongs_to :ticker
  field :data
end
